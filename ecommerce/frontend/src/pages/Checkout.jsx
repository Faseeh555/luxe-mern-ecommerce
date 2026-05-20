import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice'
import { placeOrder } from '../api'
import { showToast } from '../components/ToastContext'
import styles from './Checkout.module.css'

export default function Checkout() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    customerName: '', email: '', phone: '',
    street: '', city: '', country: '',
    paymentMethod: 'COD'
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.customerName.trim()) e.customerName = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim() || form.phone.length < 7) e.phone = 'Valid phone required'
    if (!form.street.trim()) e.street = 'Street address required'
    if (!form.city.trim()) e.city = 'City required'
    if (!form.country.trim()) e.country = 'Country required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (items.length === 0) {
      showToast('Your cart is empty', 'error')
      return
    }

    setLoading(true)
    try {
      const orderData = {
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        address: { street: form.street, city: form.city, country: form.country },
        items: items.map(i => ({ productId: i._id, quantity: i.quantity })),
        totalAmount: total,
        paymentMethod: form.paymentMethod
      }
      const res = await placeOrder(orderData)
      dispatch(clearCart())
      showToast('Order placed successfully! 🎉')
      navigate(`/order-success/${res.data.order._id}`)
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to place order', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) return (
    <main className={styles.main}>
      <div className={styles.empty}>
        <div style={{ fontSize: 56 }}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products before checking out</p>
        <Link to="/products" className={styles.shopBtn}>Browse Products</Link>
      </div>
    </main>
  )

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Checkout</h1>

        <div className={styles.layout}>
          {/* FORM */}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              <div className={styles.grid2}>
                <Field label="Full Name" name="customerName" value={form.customerName} onChange={handleChange} error={errors.customerName} placeholder="John Doe" />
                <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="john@example.com" />
                <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+92 300 1234567" />
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Delivery Address</h2>
              <div className={styles.grid1}>
                <Field label="Street Address" name="street" value={form.street} onChange={handleChange} error={errors.street} placeholder="123 Main Street" />
              </div>
              <div className={styles.grid2} style={{ marginTop: 16 }}>
                <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="Rawalpindi" />
                <Field label="Country" name="country" value={form.country} onChange={handleChange} error={errors.country} placeholder="Pakistan" />
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Payment Method</h2>
              <div className={styles.payOptions}>
                {['COD', 'Card'].map(method => (
                  <label key={method} className={`${styles.payOpt} ${form.paymentMethod === method ? styles.payActive : ''}`}>
                    <input type="radio" name="paymentMethod" value={method} checked={form.paymentMethod === method} onChange={handleChange} />
                    <span className={styles.payIcon}>{method === 'COD' ? '💵' : '💳'}</span>
                    <div>
                      <strong>{method === 'COD' ? 'Cash on Delivery' : 'Credit / Debit Card'}</strong>
                      <small>{method === 'COD' ? 'Pay when you receive' : 'Secure card payment'}</small>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <><span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Placing Order...</> : `Place Order · $${total.toFixed(2)}`}
            </button>
          </form>

          {/* ORDER SUMMARY */}
          <aside className={styles.summary}>
            <h2 className={styles.sectionTitle}>Order Summary</h2>
            <div className={styles.summaryItems}>
              {items.map(item => (
                <div key={item._id} className={styles.summaryItem}>
                  <img src={item.image} alt={item.name} className={styles.summaryImg} />
                  <div className={styles.summaryInfo}>
                    <p className={styles.summaryName}>{item.name}</p>
                    <p className={styles.summaryQty}>Qty: {item.quantity}</p>
                  </div>
                  <span className={styles.summaryPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span><span className={styles.free}>FREE</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  )
}
