import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api'
import ProductCard from '../components/ProductCard'
import styles from './Home.module.css'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts({ sort: 'rating' })
      .then(res => setFeatured(res.data.products.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className={styles.main}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroNoise} />
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>Spring Collection 2026</div>
          <h1 className={styles.heroTitle}>
            Discover <br />
            <em>Premium</em> Goods
          </h1>
          <p className={styles.heroSub}>
            Curated selection of top-rated electronics, fashion, books & more.
            Free shipping on orders over $50.
          </p>
          <div className={styles.heroActions}>
            <Link to="/products" className={styles.heroCta}>Shop Now →</Link>
            <span className={styles.heroNote}>12+ products · 6 categories</span>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatCard1}>
            <span>⭐ 4.9</span>
            <span>Top Rated</span>
          </div>
          <div className={styles.floatCard2}>
            <span>📦</span>
            <span>Free Shipping</span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80"
            alt="Shopping"
            className={styles.heroImg}
          />
          <div className={styles.heroBgCircle} />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Browse Categories</h2>
          <div className={styles.categories}>
            {[
              { name: 'Electronics', icon: '⚡', color: '#1a3a5c' },
              { name: 'Clothing', icon: '👕', color: '#2e1a3a' },
              { name: 'Books', icon: '📚', color: '#1a2e1a' },
              { name: 'Home', icon: '🏠', color: '#3a2e1a' },
              { name: 'Sports', icon: '🏃', color: '#1a3a3a' },
              { name: 'Beauty', icon: '✨', color: '#3a1a2e' },
            ].map(cat => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className={styles.catCard}
                style={{ '--cat-bg': cat.color }}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <span className={styles.catName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Top Rated Products</h2>
            <Link to="/products" className={styles.seeAll}>See All →</Link>
          </div>
          {loading ? (
            <div className={styles.grid}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className="skeleton" style={{ height: 220 }} />
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="skeleton" style={{ height: 12, width: '60%' }} />
                    <div className="skeleton" style={{ height: 16 }} />
                    <div className="skeleton" style={{ height: 14, width: '80%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {featured.map((p, i) => (
                <ProductCard key={p._id} product={p} style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BANNER */}
      <section className={styles.banner}>
        <div className={styles.bannerInner}>
          <div>
            <h2>Ready to find your perfect item?</h2>
            <p>Browse our full collection of 12+ premium products</p>
          </div>
          <Link to="/products" className={styles.bannerBtn}>Browse All Products</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span style={{ color: 'var(--accent)' }}>◈</span> LUXE
          </div>
          <p className={styles.footerText}>MERN Stack E-Commerce · NUML BSCS Web Engineering 2026</p>
        </div>
      </footer>
    </main>
  )
}
