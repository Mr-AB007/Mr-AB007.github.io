"""Builds src/data/github-snapshot.json from local clones of public repos.

Usage: python3 scripts/build-github-snapshot.py <dir-with-clones> <search.json>
search.json is either a search/repositories response ({"items": [...]}) or a
users/<user>/repos response (a plain list), e.g. from the GitHub REST API.
Only public, non-fork repositories are included. Counts are commits on the default branch.
"""
import json, subprocess, sys, os, datetime as dt
from collections import Counter

clones, search = sys.argv[1], sys.argv[2]
data = json.load(open(search))
items = data["items"] if isinstance(data, dict) else data
meta = {r["name"]: r for r in items if not r["private"] and not r["fork"] and not r["name"].lower().endswith(".github.io")}
today = dt.date.today()
repos, daily = [], Counter()
for name, r in meta.items():
    path = os.path.join(clones, name)
    if not os.path.isdir(os.path.join(path, ".git")):
        print("missing clone", name); continue
    log = subprocess.run(["git", "-C", path, "log", "--format=%ad\x1f%s", "--date=short"],
                         capture_output=True, text=True).stdout.strip().splitlines()
    rows = [l.split("\x1f", 1) for l in log if l]
    for d, _ in rows: daily[d] += 1
    months = Counter(d[:7] for d, _ in rows)
    repos.append({
        "name": name, "description": r["description"] or "", "language": r["language"],
        "url": r["html_url"], "stars": r["stargazers_count"],
        "createdAt": r["created_at"], "pushedAt": r["pushed_at"],
        "commits": len(rows),
        "firstCommit": rows[-1][0] if rows else None, "lastCommit": rows[0][0] if rows else None,
        "months": dict(sorted(months.items())),
        "recent": [{"date": d, "message": m[:120]} for d, m in rows[:6]],
    })
repos.sort(key=lambda x: x["lastCommit"] or "", reverse=True)
out = {"generatedAt": today.isoformat(), "user": "Mr-AB007", "source": "git history of public repositories (default branch)",
       "repos": repos, "daily": dict(sorted(daily.items()))}
dst = os.path.join(os.path.dirname(__file__), "..", "src", "data", "github-snapshot.json")
os.makedirs(os.path.dirname(dst), exist_ok=True)
json.dump(out, open(dst, "w"), indent=1)
print("wrote", len(repos), "repos,", sum(daily.values()), "commits")
