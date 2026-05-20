import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { showToast } from '../components/ToastContext'
import { getProduct } from '../api'
import styles from './ProductDetail.module.css'

function Stars({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return <span className="stars">{'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}</span>
}

export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProduct(id)
      .then(res => setProduct(res.data.product))
      .catch(() => showToast('Failed to load product', 'error'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      dispatch(addToCart(product))
    }
    showToast(`${product.name.split(' ').slice(0,3).join(' ')} added to cart`)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <main className={styles.main}>
      <div className={styles.skeleton}>
        <div className="skeleton" style={{ height: 480, borderRadius: 20 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 0' }}>
          <div className="skeleton" style={{ height: 12, width: '40%' }} />
          <div className="skeleton" style={{ height: 36, width: '80%' }} />
          <div className="skeleton" style={{ height: 20, width: '30%' }} />
          <div className="skeleton" style={{ height: 80 }} />
          <div className="skeleton" style={{ height: 52, borderRadius: 50 }} />
        </div>
      </div>
    </main>
  )

  if (!product) return (
    <main className={styles.main}>
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/products">← Back to Shop</Link>
      </div>
    </main>
  )

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link to="/products" className={styles.back}>← Back to Shop</Link>
        <div className={styles.layout}>
          <div className={styles.imgSide}>
            {product.badge && (
              <span className={`badge badge-${product.badge} ${styles.badge}`}>{product.badge}</span>
            )}
            <img src={product.image} alt={product.name} className={styles.img} />
          </div>

          <div className={styles.info}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.ratingRow}>
              <Stars rating={product.rating} />
              <span className={styles.ratingVal}>{product.rating}</span>
              <span className={styles.reviews}>({product.reviews?.toLocaleString()} reviews)</span>
            </div>

            <div className={styles.price}>${product.price.toFixed(2)}</div>

            <p className={styles.desc}>{product.description}</p>

            <div className={styles.stockInfo}>
              {product.stock > 0
                ? <span className={styles.inStock}>✓ In Stock ({product.stock} available)</span>
                : <span className={styles.outStock}>✕ Out of Stock</span>
              }
            </div>

            {product.stock > 0 && (
              <div className={styles.qtyRow}>
                <span>Quantity</span>
                <div className={styles.qtyControl}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
                </div>
              </div>
            )}

            <button
              className={`${styles.addBtn} ${added ? styles.added : ''}`}
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              {added ? '✓ Added to Cart!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <Link to="/checkout" className={styles.buyBtn}>
              Buy Now →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
