import { useState, useEffect } from 'react'
import { setGlobalToast } from './ToastContext'

export default function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const show = (msg, type = 'success') => {
      const id = Date.now()
      setToasts(prev => [...prev, { id, msg, type }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
    }
    setGlobalToast(show)
  }, [])

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === 'success' ? '✓' : '✕'} {t.msg}
        </div>
      ))}
    </div>
  )
}
