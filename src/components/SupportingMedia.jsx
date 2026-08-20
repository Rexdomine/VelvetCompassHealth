import { useEffect, useRef, useState } from 'react'

const DESKTOP_MOTION_QUERY = '(min-width: 769px) and (prefers-reduced-motion: no-preference)'

export default function SupportingMedia({ poster, webm, mp4, className = '' }) {
  const containerRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!window.matchMedia || !window.IntersectionObserver) return undefined

    const mediaQuery = window.matchMedia(DESKTOP_MOTION_QUERY)
    let isIntersecting = false

    const updateActivation = () => {
      setIsActive(mediaQuery.matches && isIntersecting)
    }

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting
      updateActivation()
    }, { rootMargin: '200px 0px' })

    const handleMediaChange = () => updateActivation()
    mediaQuery.addEventListener('change', handleMediaChange)
    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <div ref={containerRef} className={`supporting-media ${className}`.trim()} aria-hidden="true">
      <img src={poster} alt="" width="960" height="720" loading="lazy" decoding="async" />
      {isActive ? (
        <video autoPlay muted loop playsInline preload="none" tabIndex="-1">
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      ) : null}
    </div>
  )
}
