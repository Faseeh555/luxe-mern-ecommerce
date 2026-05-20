import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectCartItems, selectCartTotal, selectCartOpen,
  removeFromCart, updateQuantity, closeCart
} from '../store/cartSlice'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const isOpen = useSelector(selectCartOpen)
  const dispatch = useDispatch()

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.visible : ''}`} onClick={() => dispatch(closeCart())} />
      <aside className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span className={styles.title}>Your Cart</span>
          <span className={styles.count}>{items.length} items</span>
          <button className={styles.close} onClick={() => dispatch(closeCart())}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>◈</div>
            <p>Your cart is empty</p>
            <Link to="/products" onClick={() => dispatch(closeCart())} className={styles.shopBtn}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item._id} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.img} />
                  <div className={styles.info}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.price}>${(item.price * item.quantity).toFixed(2)}</p>
                    <div className={styles.qty}>
                      <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}>+</button>
                    </div>
                  </div>
                  <button className={styles.remove} onClick={() => dispatch(removeFromCart(item._id))}>✕</button>
                </div>
              ))}
            </div>
            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" onClick={() => dispatch(closeCart())} className={styles.checkoutBtn}>
                Proceed to Checkout →
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
