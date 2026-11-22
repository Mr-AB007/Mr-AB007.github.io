import type { Project } from '../data/types'

/** Real routes from each repository's controllers. */
const endpoints: Record<string, [string, string][]> = {
  journal: [['POST', '/public/create-user'], ['GET', '/journal'], ['POST', '/api/enrich/sentiment'], ['GET', '/admin/all-users']],
  'secure-apis': [['POST', '/api/auth/login'], ['GET', '/api/tasks'], ['PUT', '/api/tasks/{id}'], ['DEL', '/api/tasks/{id}']],
}

const hex = { cyan: '#5EE6F0', violet: '#9D7BFF', blue: '#5B8CFF', green: '#4ADE9B', amber: '#F5B54A' }

/** Small generated illustrations that hint at each project's architecture. */
export function ProjectCover({ project }: { project: Project }) {
  const c = hex[project.accent]
  const id = `g-${project.id}`
  const stroke = { stroke: c, strokeOpacity: 0.55, fill: 'none', strokeWidth: 1.2 }
  const box = (x: number, y: number, w = 54, h = 26, label?: string) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="#0E1118" stroke={c} strokeOpacity={0.4} />
      {label && <text x={x + w / 2} y={y + h / 2 + 3.5} textAnchor="middle" fontSize="9" fontFamily="Geist Mono, monospace" fill="#B4BCCD">{label}</text>}
    </g>
  )
  let art
  switch (project.cover) {
    case 'chat':
      art = (<>
        <rect x="40" y="26" width="150" height="22" rx="11" fill="#131722" />
        <rect x="130" y="58" width="130" height="22" rx="11" fill={c} fillOpacity={0.18} stroke={c} strokeOpacity={0.4} />
        <rect x="40" y="90" width="190" height="10" rx="5" fill="#1C2130" />
        <rect x="40" y="106" width="150" height="10" rx="5" fill="#1C2130" />
        <g fontFamily="Geist Mono, monospace" fontSize="8" fill={c}><text x="240" y="104">[1]</text><text x="240" y="118">[2]</text></g>
        <circle cx="48" cy="37" r="3" fill={c} />
      </>); break
    case 'mesh':
      art = (<>
        {box(123, 18, 54, 24, 'gateway')}
        {[40, 123, 206].map((x, i) => box(x, 70, 54, 24, ['account', 'txn', 'notify'][i]))}
        <path d="M150 42 V56 H67 V70 M150 56 V70 M150 56 H233 V70" {...stroke} />
        <path d="M177 82 H206" {...stroke} strokeDasharray="3 3" />
        <text x="150" y="122" textAnchor="middle" fontSize="8.5" fontFamily="Geist Mono, monospace" fill={c} opacity={0.8}>kafka · redis · postgres</text>
      </>); break
    case 'pipeline':
      art = (<>
        {['data', 'train', 'eval', 'serve', 'ship'].map((l, i) => box(14 + i * 56, 54, 46, 26, l))}
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M${60 + i * 56} 67 H${70 + i * 56}`} {...stroke} />)}
        <rect x="238" y="54" width="46" height="26" rx="6" fill="none" stroke={c} strokeDasharray="3 3" strokeOpacity={0.6} />
      </>); break
    case 'gateway':
      art = (<>
        {box(18, 54, 58, 26, 'gateway')}
        {box(118, 16, 64, 24, 'product')}{box(118, 56, 64, 24, 'order')}{box(118, 96, 64, 24, 'payment')}
        {box(222, 56, 60, 24, 'eureka')}
        <path d="M76 67 H96 V28 H118 M96 67 H118 M96 67 V108 H118" {...stroke} />
        <path d="M182 28 H202 V68 H222 M182 108 H202 V68" {...stroke} strokeDasharray="2 3" />
      </>); break
    case 'api':
      art = (<g fontFamily="Geist Mono, monospace" fontSize="10">
        {(endpoints[project.id] ?? endpoints.journal).map(([m, p], i) => (
          <g key={p} transform={`translate(34 ${26 + i * 24})`}>
            <rect width="232" height="18" rx="5" fill="#0E1118" stroke="#2A3142" />
            <text x="8" y="12.5" fill={c}>{m}</text><text x="46" y="12.5" fill="#B4BCCD">{p}</text>
          </g>))}
      </g>); break
    case 'books':
      art = (<>{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={60 + i * 38} y={30 + (i % 2) * 8} width="28" height={80 - (i % 2) * 8} rx="3" fill="#131722" stroke={c} strokeOpacity={0.35 + i * 0.08} />)}</>); break
    case 'runner':
      art = (<>
        {box(20, 54, 56, 26, 'gitlab')}{box(108, 20, 60, 24, 'runner')}{box(108, 56, 60, 24, 'runner')}{box(108, 92, 60, 24, 'runner')}
        {box(208, 40, 70, 24, 'ECR')}{box(208, 76, 70, 24, 'ECS')}
        <path d="M76 67 H92 V32 H108 M92 67 H108 M92 67 V104 H108 M168 68 H188 V52 H208 M188 68 V88 H208" {...stroke} />
        <text x="138" y="12" textAnchor="middle" fontSize="8" fontFamily="Geist Mono, monospace" fill={c}>EC2</text>
      </>); break
  }
  return (
    <svg viewBox="0 0 300 136" className="h-full w-full" role="img" aria-label={`${project.name} diagram`}>
      <defs>
        <radialGradient id={id} cx="70%" cy="0%" r="90%"><stop offset="0" stopColor={c} stopOpacity="0.16" /><stop offset="1" stopColor={c} stopOpacity="0" /></radialGradient>
        <pattern id={`${id}-d`} width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#fff" fillOpacity=".06" /></pattern>
      </defs>
      <rect width="300" height="136" fill={`url(#${id}-d)`} />
      <rect width="300" height="136" fill={`url(#${id})`} />
      {art}
    </svg>
  )
}
