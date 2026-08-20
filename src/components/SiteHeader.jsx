import { useEffect, useRef, useState } from 'react'

const links = [
  ['Continuity', 'continuity'],
  ['How it works', 'how-it-works'],
  ['Health intelligence', 'intelligence'],
  ['International', 'international'],
  ['Medical Director', 'medical-director'],
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    firstLinkRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Velvet Compass Health, home">
          <img src="/logo-header.webp" alt="Velvet Compass Health" width="238" height="72" />
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={open}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="primary-navigation" className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Primary navigation">
          <div className="nav-links">
            {links.map(([label, id], index) => (
              <a key={id} ref={index === 0 ? firstLinkRef : undefined} href={`#${id}`} onClick={closeMenu}>{label}</a>
            ))}
          </div>
          <div className="nav-actions">
            <a className="member-link" href="/memberarea">Member sign in</a>
            <a className="button button-small" href="#contact" onClick={closeMenu}>Enquire</a>
          </div>
        </nav>
      </div>
    </header>
  )
}
