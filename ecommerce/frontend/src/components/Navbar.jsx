import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartCount, toggleCart } from '../store/cartSlice'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const count = useSelector(selectCartCount)
  const dispatch = useDispatch()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          <span className={styles.logoText}>LUXE</span>
        </Link>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link>
          <Link to="/products" className={location.pathname === '/products' ? styles.active : ''}>Shop</Link>
        </div>

        <div className={styles.actions}>
          <button className={styles.cartBtn} onClick={() => dispatch(toggleCart())}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && <span className={styles.cartBadge}>{count}</span>}
          </button>
          <button className={styles.menuToggle} onClick={() => setMenuOpen(v => !v)}>
            <span className={menuOpen ? styles.x : ''}></span>
            <span className={menuOpen ? styles.x : ''}></span>
            <span className={menuOpen ? styles.x : ''}></span>
          </button>
        </div>
      </div>
    </nav>
  )
}
