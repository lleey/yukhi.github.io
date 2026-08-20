import { useEffect, useState } from 'react'

function Navigation() {
  const navLinks = [
    { href: '#capabilities', label: '能力' },
    { href: '#scenarios', label: '场景' },
    { href: '#demo', label: '演示' },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`site-nav${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-nav__inner">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="回到 Claude 首页">
          <span className="brand__mark" aria-hidden="true" />
          <span>Claude</span>
        </a>

        <nav className="site-nav__links" aria-label="主要导航">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="button button--primary site-nav__desktop-cta" href="#demo">
          开始探索 <span className="button__arrow" aria-hidden="true">↗</span>
        </a>

        <button
          className="site-nav__menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="site-nav__menu-icon" aria-hidden="true" />
        </button>
      </div>

      <nav
        className={`site-nav__mobile${isMenuOpen ? ' is-open' : ''}`}
        id="mobile-navigation"
        aria-label="移动端主要导航"
        aria-hidden={!isMenuOpen}
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
            {link.label}
          </a>
        ))}
        <a className="button button--primary" href="#demo" onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
          开始探索 <span className="button__arrow" aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}

export default Navigation
