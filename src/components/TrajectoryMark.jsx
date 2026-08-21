export default function TrajectoryMark({ variant = 'curve' }) {
  const path = variant === 'route'
    ? 'M8 88 C80 18 152 122 236 48 S390 18 492 74'
    : 'M8 76 C110 8 194 124 300 54 S438 24 492 74'

  return (
    <svg className={`trajectory trajectory-${variant}`} viewBox="0 0 500 130" aria-hidden="true" focusable="false">
      <path className="trajectory-shadow" d={path} />
      <path className="trajectory-line" d={path} pathLength="1" />
      <circle cx="492" cy="74" r="4" />
    </svg>
  )
}
