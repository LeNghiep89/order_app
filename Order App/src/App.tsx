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

const FLOW: Screen[] = ['tablet-checkin', 'menu', 'cart', 'order', 'payment']
const LABELS: Partial<Record<Screen, string>> = {
  'tablet-checkin': '⊞ Tablet Check-in',
  menu: 'Thực đơn',
  cart: 'Giỏ hàng',
  order: 'Đã gọi',
  payment: 'Thanh toán',
}

function PrototypeNav({ current, onGo }: { current: Screen; onGo: (s: Screen) => void }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', gap: 4, padding: '6px 10px',
        background: 'rgba(30,15,4,0.88)', borderRadius: '20px 20px 0 0',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 -2px 20px rgba(0,0,0,0.35)',
        pointerEvents: 'all',
      }}>
        {FLOW.map(s => (
          <button key={s} onClick={() => onGo(s)} style={{
            padding: '5px 12px', borderRadius: 14,
            background: current === s ? 'linear-gradient(135deg, #c9a227, #f0c040)' : 'rgba(240,192,64,0.1)',
            border: 'none', cursor: 'pointer',
            fontSize: 11.5, fontWeight: current === s ? 700 : 500,
            color: current === s ? '#1e0f04' : 'rgba(240,192,64,0.65)',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            transition: 'all 0.15s',
          }}>
            {LABELS[s]}
          </button>
        ))}
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

      {/* Screen layer */}
      <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: !isTablet ? 50 : 0 }}>

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

      {/* Prototype nav (always on top) */}
      <PrototypeNav current={screen} onGo={handleGoTo} />
    </div>
  )
}
