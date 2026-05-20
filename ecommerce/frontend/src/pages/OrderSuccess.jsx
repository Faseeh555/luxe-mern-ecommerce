import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import styles from './OrderSuccess.module.css'

export default function OrderSuccess() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/orders/${id}`)
      .then(res => setOrder(res.data.order))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className="spinner" style={{ width: 48, height: 48 }} />
      </div>
    </main>
  )

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.sub}>Thank you for your purchase. Your order has been placed successfully.</p>

        {order && (
          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span>Order ID</span>
              <span className={styles.mono}>{order._id}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Name</span>
              <span>{order.customerName}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Email</span>
              <span>{order.email}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Delivery To</span>
              <span>{order.address.street}, {order.address.city}, {order.address.country}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Payment</span>
              <span>{order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Card'}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Status</span>
              <span className={styles.status}>{order.status}</span>
            </div>
            <div className={`${styles.detailRow} ${styles.totalRow}`}>
              <span>Total Paid</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className={styles.items}>
          <h3>Items Ordered</h3>
          {order?.items.map((item, i) => (
            <div key={i} className={styles.item}>
              <img src={item.image} alt={item.name} className={styles.itemImg} />
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemQty}>×{item.quantity}</span>
              <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Link to="/products" className={styles.continueBtn}>Continue Shopping →</Link>
          <Link to="/" className={styles.homeBtn}>Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
