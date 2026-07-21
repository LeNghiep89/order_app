import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { changeCartQty, deleteFromCart, addUpsell, clearCart } from '../../../store/slices/cartSlice'
import { submitOrder } from '../../../store/slices/orderSlice'
import { goTo } from '../../../store/slices/navigationSlice'
import { UPSELL_DISHES, fmt } from '../../../data'
import { microcopy } from '../../../locales/vi'

import CartRow from '../components/CartRow'
import UpsellCard from '../components/UpsellCard'

interface CartScreenProps {
  isSidebar?: boolean
}

export default function CartScreen({ isSidebar = false }: CartScreenProps) {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart.cart)
  const tableId = useAppSelector(state => state.table.tableId)

  const [ordering, setOrdering] = useState(false)

  const subtotal = cart.reduce((s, i) => s + i.dish.price * i.qty, 0)
  const vat = Math.round(subtotal * 0.08)
  const total = subtotal + vat

  const handleOrder = () => {
    setOrdering(true)
    setTimeout(() => {
      setOrdering(false)
      dispatch(submitOrder(cart))
      dispatch(clearCart())
      dispatch(goTo('order'))
    }, 1100)
  }

  // Styles based on mode
  const containerStyle: React.CSSProperties = isSidebar
    ? { display: 'flex', flexDirection: 'column', height: '100%', background: '#f7f2ea', fontFamily: "'Be Vietnam Pro', sans-serif" }
    : { minHeight: '100vh', background: '#f7f2ea', fontFamily: "'Be Vietnam Pro', sans-serif" }

  const scrollAreaStyle: React.CSSProperties = isSidebar
    ? { flex: 1, overflowY: 'auto', padding: '14px 16px', paddingBottom: 24 }
    : { padding: '14px 16px', paddingBottom: 130 }

  const bottomBarStyle: React.CSSProperties = isSidebar
    ? { background: '#fff', borderTop: '1px solid rgba(200,160,80,0.2)', padding: '14px 16px' }
    : { position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, background: '#fff', borderTop: '1px solid rgba(200,160,80,0.2)', boxShadow: '0 -4px 24px rgba(0,0,0,0.1)', padding: '14px 16px 28px' }

  return (
    <div style={containerStyle}>
      {/* Header (Hidden in Sidebar mode) */}
      {!isSidebar ? (
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: '#fff',
          borderBottom: '1px solid rgba(200,160,80,0.2)',
          boxShadow: '0 1px 12px rgba(0,0,0,0.07)',
          padding: '0 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', height: 56 }}>
            <button onClick={() => dispatch(goTo('menu'))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 8px 8px 0', display: 'flex', alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <img src="/logo.png" alt="Madame Lân Logo" style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'cover' }} />
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: '#1e0f04' }}>Giỏ hàng</div>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(200,130,30,0.1)', border: '1px solid rgba(200,130,30,0.35)',
              borderRadius: 16, padding: '3px 10px',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(180,100,20,0.7)">
                <rect x="2" y="7" width="20" height="3" rx="1.5"/>
                <rect x="5" y="10" width="3" height="7" rx="1"/><rect x="16" y="10" width="3" height="7" rx="1"/>
              </svg>
              <span style={{ fontSize: 11.5, color: '#8a5010', fontWeight: 700, letterSpacing: '0.05em' }}>Bàn {tableId}</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px', borderBottom: '1px solid rgba(200,160,80,0.2)', background: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/logo.png" alt="Madame Lân Logo" style={{ width: 30, height: 30, borderRadius: 7, objectFit: 'cover', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: '#1e0f04', lineHeight: 1.1 }}>
                Bữa ăn của bạn
              </div>
              <div style={{ fontSize: 11, color: '#8a6040' }}>Bàn {tableId}</div>
            </div>
          </div>
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#b8860b', background: '#fff8e8',
            border: '1px solid #e8d5a0', padding: '3px 8px', borderRadius: 12,
          }}>
            Tablet Mode
          </span>
        </div>
      )}

      {/* Main cart items area */}
      <div style={scrollAreaStyle} className="hide-scrollbar">
        {/* Empty state */}
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: isSidebar ? 32 : 64 }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🛒</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#6b4020', marginBottom: 4 }}>
              {microcopy.cart.emptyTitle}
            </div>
            <div style={{ fontSize: 12.5, color: '#a08060' }}>
              {microcopy.cart.emptySub}
            </div>
          </div>
        ) : (
          <>
            {/* Item count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 3, height: 14, borderRadius: 2, background: 'linear-gradient(180deg, #f0c040, #c9a227)' }}/>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#8a5c20', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {microcopy.cart.itemsCount(cart.reduce((s,i) => s + i.qty, 0))}
              </span>
            </div>

            {/* Cart items */}
            {cart.map(item => (
              <CartRow
                key={item.dish.id}
                item={item}
                onChange={qty => dispatch(changeCartQty({ id: item.dish.id, qty }))}
                onDelete={() => dispatch(deleteFromCart(item.dish.id))}
              />
            ))}

            {/* Price breakdown */}
            <div style={{
              background: '#fff', borderRadius: 14, padding: '14px 16px',
              border: '1px solid rgba(200,160,80,0.15)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              marginBottom: 20, marginTop: 6,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#7a5030' }}>{microcopy.cart.subtotal}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1e0f04' }}>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottom: '1px dashed rgba(200,160,80,0.3)' }}>
                <span style={{ fontSize: 13, color: '#7a5030' }}>{microcopy.cart.vat}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1e0f04' }}>{fmt(vat)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1e0f04' }}>{microcopy.cart.total}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#b82c0a' }}>{fmt(total)}</span>
              </div>
            </div>
          </>
        )}

        {/* Upsell */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 3, height: 14, borderRadius: 2, background: 'linear-gradient(180deg, #f0c040, #c9a227)' }}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#8a5c20', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {microcopy.cart.upsellTitle}
            </span>
          </div>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {UPSELL_DISHES.map(dish => (
              <UpsellCard key={dish.id} dish={dish} onAdd={() => dispatch(addUpsell(dish))} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      {cart.length > 0 && (
        <div style={bottomBarStyle}>
          <div style={{ maxWidth: 430, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#7a5030' }}>Tạm tính bữa ăn:</span>
              <span style={{ fontSize: 17, fontWeight: 800, color: '#b82c0a', fontFamily: "'Playfair Display', serif" }}>{fmt(total)}</span>
            </div>
            <button
              onClick={handleOrder}
              disabled={ordering}
              style={{
                width: '100%', padding: '14px',
                background: ordering
                  ? 'rgba(212,168,32,0.6)'
                  : 'linear-gradient(135deg, #b8860b 0%, #d4a820 30%, #f0c040 60%, #d4a820 100%)',
                border: 'none', borderRadius: 14,
                fontSize: 15, fontWeight: 800,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                color: '#1e0f04', cursor: ordering ? 'default' : 'pointer',
                letterSpacing: '0.04em',
                boxShadow: ordering ? 'none' : '0 6px 28px rgba(212,168,32,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'all 0.15s',
                minHeight: 48,
              }}
            >
              {ordering ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <path d="M12 2a10 10 0 1 0 10 10" />
                  </svg>
                  {microcopy.cart.submittingCta}
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  {microcopy.cart.submitCta}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
