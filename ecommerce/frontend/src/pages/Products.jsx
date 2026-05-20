import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../api'
import ProductCard from '../components/ProductCard'
import styles from './Products.module.css'

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty']
const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [sort, setSort] = useState('newest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const fetchProducts = useCallback(() => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (category !== 'All') params.category = category
    if (minPrice) params.minPrice = minPrice
    if (maxPrice) params.maxPrice = maxPrice
    params.sort = sort

    getProducts(params)
      .then(res => setProducts(res.data.products))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [search, category, sort, minPrice, maxPrice])

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300)
    return () => clearTimeout(timer)
  }, [fetchProducts])

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setSort('newest'); setMinPrice(''); setMaxPrice('')
  }

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.filterTitle}>Filters</h3>

            <div className={styles.filterGroup}>
              <label>Category</label>
              <div className={styles.catList}>
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    className={`${styles.catBtn} ${category === c ? styles.active : ''}`}
                    onClick={() => setCategory(c)}
                  >{c}</button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>Price Range</label>
              <div className={styles.priceRow}>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className={styles.priceInput}
                />
                <span>—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className={styles.priceInput}
                />
              </div>
            </div>

            <button className={styles.clearBtn} onClick={clearFilters}>Clear All Filters</button>
          </div>
        </aside>

        {/* MAIN */}
        <div className={styles.content}>
          <div className={styles.topBar}>
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              {search && (
                <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>
              )}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <div className={styles.resultsInfo}>
            {loading ? 'Loading...' : `${products.length} products found`}
          </div>

          {loading ? (
            <div className={styles.grid}>
              {[...Array(8)].map((_, i) => (
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
          ) : products.length === 0 ? (
            <div className={styles.empty}>
              <div style={{ fontSize: 48 }}>🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term</p>
              <button onClick={clearFilters} className={styles.clearBtn2}>Clear Filters</button>
            </div>
          ) : (
            <div className={styles.grid}>
              {products.map((p, i) => (
                <ProductCard key={p._id} product={p} style={{ animationDelay: `${i * 0.05}s` }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
