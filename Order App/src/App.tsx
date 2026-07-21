import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import { goTo } from './store/slices/navigationSlice'
import type { Screen } from './types'

import CheckinSheet from './features/checkin/screens/CheckinSheet'
import LoadingScreen from './features/checkin/screens/LoadingScreen'
import MenuScreen from './features/menu/screens/MenuScreen'
import CartScreen from './features/cart/screens/CartScreen'
import OrderScreen from './features/order/screens/OrderScreen'
import PaymentScreen from './features/payment/screens/PaymentScreen'
import TabletCheckinScreen from './features/checkin/screens/TabletCheckinScreen'
import NPSScreen from './features/nps/screens/NPSScreen'

// ─── Screen transition wrapper ────────────────────────────────────────────────

function SlideView({ screen, children }: { screen: Screen; children: React.ReactNode }) {
  return (
    <div key={screen} style={{
      position: 'absolute', inset: 0,
      animation: 'slideIn 0.3s cubic-bezier(0.4,0,0.2,1) both',
    }}>
      {children}
    </div>
  )
}

// ─── Demo nav bar (prototype only) ───────────────────────────────────────────

const FLOW: Screen[] = ['tablet-checkin', 'menu', 'order', 'payment', 'nps']
const LABELS: Partial<Record<Screen, string>> = {
  'tablet-checkin': '⊞ Check-in',
  menu: 'Thực đơn',
  order: 'Bếp & Món đã gọi',
  payment: 'Thanh toán',
  nps: 'Đánh giá NPS',
}

function TopHeaderNav({ current, onGo }: { current: Screen; onGo: (s: Screen) => void }) {
  const cart = useAppSelector(state => state.cart.cart)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      height: 48,
      background: 'linear-gradient(135deg, #1c0c03 0%, #2a1406 100%)',
      borderBottom: '1.5px solid rgba(240,192,64,0.3)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px',
    }}>
      {/* Brand Logo & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => onGo('tablet-checkin')}>
        <img src="/logo.png" alt="Madame Lân Logo" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} />
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: '#f0c040', lineHeight: 1.1 }}>
            Madame Lân
          </div>
          <div style={{ fontSize: 9.5, color: 'rgba(240,192,64,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Tablet Order System
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6 }}>
        {FLOW.map(s => {
          const active = current === s
          return (
            <button
              key={s}
              onClick={() => onGo(s)}
              style={{
                padding: '6px 14px',
                borderRadius: 10,
                background: active
                  ? 'linear-gradient(135deg, #c9a227, #f0c040)'
                  : 'rgba(240,192,64,0.1)',
                border: active ? '1px solid #f0c040' : '1px solid rgba(240,192,64,0.18)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: active ? 800 : 600,
                color: active ? '#1e0f04' : '#f0c040',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{LABELS[s]}</span>
              {s === 'cart' && cartCount > 0 && (
                <span style={{
                  background: '#b82c0a', color: '#fff', fontSize: 10, fontWeight: 800,
                  borderRadius: 10, padding: '1px 6px', lineHeight: 1,
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Table Badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(240,192,64,0.15)', border: '1px solid rgba(240,192,64,0.35)',
        borderRadius: 16, padding: '4px 12px',
      }}>
        <span style={{ fontSize: 12, color: '#f0c040', fontWeight: 800 }}>Bàn A1</span>
      </div>
    </div>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const dispatch = useAppDispatch()
  
  const screen = useAppSelector(state => state.navigation.currentScreen)
  const showCheckin = useAppSelector(state => state.navigation.showCheckinOverlay)
  const loading = useAppSelector(state => state.navigation.loading)
  const viewportMode = useAppSelector(state => state.navigation.viewportMode)

  const handleGoTo = useCallback((s: Screen) => {
    dispatch(goTo(s))
  }, [dispatch])

  const isTablet = viewportMode === 'tablet' || screen === 'tablet-checkin'

  return (
    <div style={{
      position: 'relative',
      maxWidth: isTablet ? '100%' : 430,
      margin: '0 auto',
      minHeight: '100vh',
      overflow: 'hidden',
      background: '#1e0f04',
      paddingTop: 48, // Padding for fixed top header bar
    }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(32px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Fixed Top Header Bar */}
      <TopHeaderNav current={screen} onGo={handleGoTo} />

      {/* Screen layer */}
      <div style={{ position: 'relative', minHeight: 'calc(100vh - 48px)' }}>

        {screen === 'tablet-checkin' && (
          <TabletCheckinScreen />
        )}

        {screen === 'menu' && (
          <SlideView screen="menu">
            <MenuScreen />
          </SlideView>
        )}

        {screen === 'cart' && (
          <SlideView screen="cart">
            <CartScreen />
          </SlideView>
        )}

        {screen === 'order' && (
          <SlideView screen="order">
            <OrderScreen />
          </SlideView>
        )}

        {screen === 'payment' && (
          <SlideView screen="payment">
            <PaymentScreen />
          </SlideView>
        )}

        {screen === 'nps' && (
          <SlideView screen="nps">
            <NPSScreen />
          </SlideView>
        )}

        {/* Overlays */}
        {showCheckin && (
          <CheckinSheet />
        )}

        {loading && (
          <LoadingScreen />
        )}
      </div>
    </div>
  )
}
