import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { showToast } from './ToastContext'
import styles from './ProductCard.module.css'

function Stars({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="stars">
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

export default function ProductCard({ product, style }) {
  const dispatch = useDispatch()

  const handleAdd = (e) => {
    e.preventDefault()
    dispatch(addToCart(product))
    showToast(`${product.name.split(' ').slice(0,3).join(' ')} added to cart`)
  }

  return (
    <Link to={`/products/${product._id}`} className={styles.card} style={style}>
      <div className={styles.imgWrap}>
        {product.badge && (
          <span className={`badge badge-${product.badge} ${styles.badge}`}>{product.badge}</span>
        )}
        <img src={product.image} alt={product.name} className={styles.img} loading="lazy" />
        <div className={styles.overlay}>
          <button className={styles.quickAdd} onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.row}>
          <Stars rating={product.rating} />
          <span className={styles.reviews}>({product.reviews?.toLocaleString()})</span>
        </div>
        <div className={styles.bottom}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button
            className={styles.addBtn}
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : '+'}
          </button>
        </div>
      </div>
    </Link>
  )
}
