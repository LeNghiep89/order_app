import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../store'
import { setShowCheckin } from '../../../store/slices/navigationSlice'

import QRGraphic from '../components/QRGraphic'
import ScanLine from '../components/ScanLine'
import CornerBrackets from '../components/CornerBrackets'

export default function ScannerScreen() {
  const dispatch = useAppDispatch()
  const [success, setSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setSuccess(true)
      setTimeout(() => {
        dispatch(setShowCheckin(true))
      }, 700)
    }, 3200)
    return () => clearTimeout(t)
  }, [dispatch])

  const gold = success ? '#22c55e' : '#f0c040'
  const glow = success
    ? '0 0 16px rgba(34,197,94,0.8)'
    : '0 0 10px rgba(240,192,64,0.6)'

  const handleManual = () => {
    dispatch(setShowCheckin(true))
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src="https://images.unsplash.com/photo-1685904899685-058c71a8f4e3?w=800&h=1400&fit=crop&auto=format"
        alt="Restaurant interior"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(3px) brightness(0.35) saturate(1.1)', transform: 'scale(1.05)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,6,2,0.7) 0%, rgba(35,15,4,0.45) 45%, rgba(15,6,2,0.75) 100%)' }}/>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ paddingTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36 }}>
          <div style={{
            width: 54, height: 54, borderRadius: '50%',
            background: 'linear-gradient(135deg, #b8860b 0%, #f0c040 50%, #c9a227 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(240,192,64,0.35)', marginBottom: 10,
          }}>
            <span style={{ fontSize: 26 }}>🌸</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 24, color: '#f0c040', letterSpacing: '0.03em' }}>
            Madame Lân
          </div>
          <div style={{ fontSize: 10, color: 'rgba(240,192,64,0.5)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 3, fontWeight: 500 }}>
            Nhà hàng truyền thống
          </div>
        </div>

        {/* Error banner */}
        {showError && (
          <div style={{
            width: '100%', background: 'rgba(185,28,28,0.88)',
            border: '1px solid rgba(255,100,80,0.4)', borderRadius: 10,
            padding: '10px 14px', display: 'flex', gap: 8, marginBottom: 16, backdropFilter: 'blur(8px)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fca5a5', marginBottom: 1 }}>Không thể quét mã</div>
              <div style={{ fontSize: 11, color: 'rgba(254,205,195,0.85)', lineHeight: 1.5 }}>
                Mã QR không hợp lệ hoặc bạn đang ở ngoài phạm vi nhà hàng
              </div>
            </div>
            <button onClick={() => setShowError(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,200,190,0.6)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
          </div>
        )}

        {/* Viewfinder */}
        <div style={{ position: 'relative', width: 244, height: 244, marginBottom: 32 }}>
          {/* Success flash overlay */}
          {success && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 20, borderRadius: 12,
              background: 'rgba(34,197,94,0.18)',
              animation: 'pulse 0.6s ease-out',
            }}/>
          )}
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(255,248,228,0.97)',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: success
              ? `0 0 0 4px rgba(34,197,94,0.8), 0 16px 48px rgba(0,0,0,0.5)`
              : `0 12px 48px rgba(0,0,0,0.5)`,
            transition: 'box-shadow 0.4s',
          }}>
            <ScanLine active success={success} />
            <div style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <QRGraphic />
            </div>
          </div>

          {/* Corner brackets */}
          <CornerBrackets color={gold} glowColor={glow} offset={-10} size={30} />
        </div>

        {/* Status text */}
        <div style={{ textAlign: 'center', marginBottom: 'auto' }}>
          {success ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style={{ fontSize: 17, fontWeight: 700, color: '#22c55e' }}>Quét thành công!</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,245,215,0.6)' }}>Đang chuyển đến bàn của bạn...</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,245,215,0.95)', lineHeight: 1.55, marginBottom: 8 }}>
                Quét mã QR tại bàn để bắt đầu đặt món
              </div>
              <div style={{ fontSize: 13, color: 'rgba(240,192,64,0.6)', lineHeight: 1.6, maxWidth: 280 }}>
                Nhiều khách hàng có thể cùng quét để gọi món chung
              </div>
            </>
          )}
        </div>

        {/* Bottom */}
        {!success && (
          <div style={{ width: '100%', paddingBottom: 44, marginTop: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(240,192,64,0.18)' }}/>
              <span style={{ fontSize: 11, color: 'rgba(240,192,64,0.38)', letterSpacing: '0.1em' }}>HOẶC</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(240,192,64,0.18)' }}/>
            </div>
            <button
              onClick={handleManual}
              style={{
                width: '100%', padding: '14px',
                background: 'transparent',
                border: '1.5px solid rgba(240,192,64,0.4)',
                borderRadius: 12, color: 'rgba(240,192,64,0.8)',
                fontSize: 14, fontWeight: 600,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                cursor: 'pointer', letterSpacing: '0.02em',
                backdropFilter: 'blur(4px)',
              }}
            >
              Nhập mã bàn thủ công
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
