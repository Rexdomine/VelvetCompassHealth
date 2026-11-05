export default function MembershipNavItem({ mobile = false, current = false }) {
  if (mobile) {
    return (
      <details className="membership-nav-group is-mobile">
        <summary aria-label="Membership submenu">
          <span>Membership</span>
          <span className="membership-nav-hint" aria-hidden="true">
            <span>3 pages</span>
            <span className="membership-nav-chevron" />
          </span>
        </summary>
        <div className="membership-submenu">
          <a href="/membership" aria-current={current === 'overview' ? 'page' : undefined}>Membership overview</a>
          <a href="/membership/athletes" aria-current={current === 'athletes' ? 'page' : undefined}>Athletes</a>
          <a href="/membership/international-students" aria-current={current === 'international-students' ? 'page' : undefined}>International Students</a>
        </div>
      </details>
    )
  }

  return (
    <div className="membership-nav-group">
      <a href="/membership" aria-current={current === 'overview' ? 'page' : undefined}>Membership</a>
      <div className="membership-submenu">
        <a href="/membership/athletes" aria-current={current === 'athletes' ? 'page' : undefined}>Athletes</a>
        <a href="/membership/international-students" aria-current={current === 'international-students' ? 'page' : undefined}>International Students</a>
      </div>
    </div>
  )
}
