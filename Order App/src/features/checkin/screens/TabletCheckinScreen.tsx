import { useState, useEffect, useRef } from 'react'
import { useAppDispatch } from '../../../store'
import { setGuests, setNote } from '../../../store/slices/tableSlice'
import { goTo, setLoading, setViewportMode } from '../../../store/slices/navigationSlice'

import QRGraphic from '../components/QRGraphic'
import ScanLine from '../components/ScanLine'
import CornerBrackets from '../components/CornerBrackets'
import PulseDot from '../components/PulseDot'

export default function TabletCheckinScreen() {
  const dispatch = useAppDispatch()
  const [phase, setPhase] = useState<'scanning' | 'validating' | 'success'>('scanning')
  const [localGuests, setLocalGuests] = useState(2)
  const [localNote, setLocalNote] = useState('')
  const [showError, setShowError] = useState(false)
  const [noteFocused, setNoteFocused] = useState(false)

  // Simulate scan → validate → success
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('validating'), 2000)
    const t2 = setTimeout(() => setPhase('success'), 4000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const clamp = (n: number) => Math.max(1, Math.min(20, n))

  const isSuccess = phase === 'success'
  const isValidating = phase === 'validating'

  const cornerColor = isSuccess ? '#22c55e' : '#f0c040'
  const cornerGlow = isSuccess ? 'rgba(34,197,94,0.55)' : 'rgba(240,192,64,0.5)'

  const statusText = isSuccess
    ? 'Xác thực thành công · Bàn A1'
    : isValidating
      ? 'Đang xác thực phạm vi nhà hàng...'
      : 'Hướng camera vào mã QR trên bàn'

  const statusColor = isSuccess
    ? '#22c55e'
    : isValidating
      ? 'rgba(240,192,64,0.85)'
      : 'rgba(240,192,64,0.55)'

  const handleStart = () => {
    dispatch(setGuests(localGuests))
    dispatch(setNote(localNote))
    dispatch(setViewportMode('tablet'))
    dispatch(setLoading(true))
    dispatch(goTo('menu'))
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes tabletPulse {
          0%   { transform: scale(1); opacity: 0.5; }
          70%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes tabletFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabletSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabletShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════════
          LEFT PANEL — Scan Viewfinder
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        width: '50%',
        flexShrink: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Dark wood background */}
        <img
          src="https://images.unsplash.com/photo-1606744888344-493238951221?w=1200&h=900&fit=crop&auto=format"
          alt="Dark wood table surface"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.38) saturate(1.2) contrast(1.05)',
          }}
        />
        {/* Rich overlay — warm amber vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(10,4,1,0.15) 0%, rgba(5,2,1,0.75) 100%)',
        }} />
        {/* Subtle texture grain */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }} />

        {/* Centered content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}>
          {/* Ambient brand label */}
          <div style={{
            fontSize: 10.5,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(240,192,64,0.4)',
            fontWeight: 500,
            marginBottom: 40,
            fontFamily: "'Be Vietnam Pro', sans-serif",
          }}>
            Madame Lân · Nhà hàng truyền thống
          </div>

          {/* Viewfinder */}
          <div style={{ position: 'relative', width: 280, height: 280 }}>
            {/* Success glow overlay */}
            {isSuccess && (
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 20,
                borderRadius: 16,
                background: 'rgba(34,197,94,0.12)',
                animation: 'tabletFadeIn 0.5s ease-out both',
              }} />
            )}
            {/* White QR card */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,250,235,0.96)',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: isSuccess
                ? '0 0 0 3px rgba(34,197,94,0.7), 0 20px 60px rgba(0,0,0,0.65)'
                : '0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(240,192,64,0.1)',
              transition: 'box-shadow 0.45s ease',
            }}>
              <ScanLine active success={isSuccess} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                padding: 16,
              }}>
                <QRGraphic tint={isSuccess ? 'rgba(20,100,60,0.85)' : 'rgba(30,15,4,0.88)'} cellSize={10} />
              </div>
            </div>

            {/* Corner bracket indicators */}
            <CornerBrackets color={cornerColor} glowColor={cornerGlow} offset={-14} size={38} />
          </div>

          {/* Status indicator */}
          <div style={{
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '9px 20px',
            borderRadius: 30,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(240,192,64,0.12)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.4s ease',
          }}>
            {isSuccess ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <PulseDot color={isValidating ? '#f0c040' : 'rgba(240,192,64,0.5)'} />
            )}
            <span style={{
              fontSize: 12.5,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: isSuccess ? 600 : 400,
              color: statusColor,
              letterSpacing: '0.01em',
              transition: 'color 0.4s ease',
            }}>
              {statusText}
            </span>
          </div>

          {/* Tap-to-trigger-error link */}
          {!isSuccess && !showError && (
            <button
              onClick={() => setShowError(true)}
              style={{
                marginTop: 20,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 11,
                color: 'rgba(240,192,64,0.3)',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                letterSpacing: '0.08em',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(240,192,64,0.15)',
                padding: '4px 8px',
              }}
            >
              Mô phỏng lỗi QR
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          RIGHT PANEL — Setup Form
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        flex: 1,
        background: '#fffdf8',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderLeft: '1px solid rgba(200,160,80,0.15)',
      }}>
        {/* Subtle warm gradient backdrop */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(160deg, rgba(255,248,225,0.6) 0%, rgba(255,253,248,0.9) 60%, #fffdf8 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '0 52px',
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 36,
            paddingBottom: 28,
            borderBottom: '1px solid rgba(200,160,80,0.2)',
          }}>
            <img
              src="/logo.png"
              alt="Madame Lân Logo"
              style={{
                width: 60,
                height: 60,
                borderRadius: 14,
                objectFit: 'cover',
                boxShadow: '0 4px 18px rgba(168,36,36,0.4), 0 0 0 2px rgba(240,192,64,0.3)',
                marginBottom: 10,
              }}
            />
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 24,
              color: '#1e0f04',
              letterSpacing: '0.01em',
              lineHeight: 1.2,
              textAlign: 'center',
            }}>
              Chào mừng bạn đến với Madame Lân
            </div>
            <div style={{
              fontSize: 12,
              color: '#8a6040',
              marginTop: 6,
              fontWeight: 500,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              textAlign: 'center',
              lineHeight: 1.5,
              padding: '0 10px',
            }}>
              Mời bạn chọn vị ngon để bắt đầu bữa ăn trọn vẹn cùng gia đình và bạn bè.
            </div>
          </div>

          {/* Dynamic table header */}
          <div style={{ paddingTop: 22, paddingBottom: 18, minHeight: 74 }}>
            {isSuccess ? (
              <div style={{ animation: 'tabletSlideDown 0.4s cubic-bezier(0.32,0.72,0,1) both' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: 'linear-gradient(135deg, #1e0f04, #3d2010)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(30,15,4,0.25)',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0c040" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: '#1e0f04',
                      lineHeight: 1.1,
                    }}>
                      Bàn A1 — Khu A
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: 'rgba(120,75,30,0.6)',
                      marginTop: 2,
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}>
                      Tầng 1 · Phòng trong
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '4px 12px',
                      borderRadius: 20,
                      background: 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.3)',
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#16a34a', fontFamily: "'Be Vietnam Pro', sans-serif" }}>Đã xác thực</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  flexShrink: 0,
                  background: 'rgba(200,160,80,0.1)',
                  border: '1.5px dashed rgba(200,160,80,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(200,160,80,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'rgba(150,100,50,0.45)',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    letterSpacing: '0.01em',
                  }}>
                    Đang chờ xác thực QR...
                  </div>
                  <div style={{
                    fontSize: 11.5,
                    color: 'rgba(150,100,50,0.35)',
                    marginTop: 2,
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                  }}>
                    Thông tin bàn sẽ hiển thị sau khi quét
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(200,160,80,0.25) 0%, rgba(200,160,80,0.08) 100%)', marginBottom: 22 }} />

          {/* Scrollable form area */}
          <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }} className="hide-scrollbar">

            {/* Guest counter */}
            <div style={{ marginBottom: 22 }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10.5,
                fontWeight: 700,
                color: '#6b4020',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 12,
                fontFamily: "'Be Vietnam Pro', sans-serif",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
                Số lượng khách tại bàn
              </label>

              {/* Large counter row */}
              <div style={{
                display: 'flex',
                alignItems: 'stretch',
                border: '2px solid #e8d5a0',
                borderRadius: 14,
                overflow: 'hidden',
                background: '#fffbf0',
                boxShadow: '0 2px 12px rgba(200,160,80,0.1)',
              }}>
                <button
                  onClick={() => setLocalGuests(clamp(localGuests - 1))}
                  style={{
                    width: 72,
                    border: 'none',
                    cursor: localGuests <= 1 ? 'default' : 'pointer',
                    background: localGuests <= 1
                      ? '#f5ead5'
                      : 'linear-gradient(135deg, #e8d590, #f0c040)',
                    fontSize: 30,
                    color: localGuests <= 1 ? '#c8b880' : '#1e0f04',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 300,
                    flexShrink: 0,
                    lineHeight: 1,
                    transition: 'background 0.2s',
                  }}
                >
                  −
                </button>
                <div style={{ flex: 1, textAlign: 'center', padding: '14px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span style={{
                    fontSize: 40,
                    fontWeight: 700,
                    fontFamily: "'Playfair Display', serif",
                    color: '#1e0f04',
                    lineHeight: 1,
                  }}>
                    {localGuests}
                  </span>
                  <span style={{ fontSize: 14, color: '#8a6040', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    người
                  </span>
                </div>
                <button
                  onClick={() => setLocalGuests(clamp(localGuests + 1))}
                  style={{
                    width: 72,
                    border: 'none',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #c9a227, #f0c040)',
                    fontSize: 30,
                    color: '#1e0f04',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 300,
                    flexShrink: 0,
                    lineHeight: 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  +
                </button>
              </div>

              {/* Quick preset chips */}
              <div style={{ display: 'flex', gap: 7, marginTop: 10, flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => (
                  <button
                    key={n}
                    onClick={() => setLocalGuests(n)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: 20,
                      cursor: 'pointer',
                      border: localGuests === n ? '1.5px solid #f0c040' : '1.5px solid #e0cca0',
                      background: localGuests === n
                        ? 'linear-gradient(135deg, #c9a227, #f0c040)'
                        : 'rgba(240,192,64,0.06)',
                      color: localGuests === n ? '#1e0f04' : '#8a6840',
                      fontSize: 13,
                      fontWeight: localGuests === n ? 700 : 400,
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      transition: 'all 0.15s',
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes textarea */}
            <div style={{ marginBottom: 6 }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10.5,
                fontWeight: 700,
                color: '#6b4020',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
                fontFamily: "'Be Vietnam Pro', sans-serif",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Ghi chú đặc biệt cho bàn ăn
                <span style={{ color: '#c8b090', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>
                  (nếu có)
                </span>
              </label>
              <textarea
                value={localNote}
                onChange={e => setLocalNote(e.target.value)}
                onFocus={() => setNoteFocused(true)}
                onBlur={() => setNoteFocused(false)}
                placeholder="Ví dụ: Không ăn được hải sản, cần ghế trẻ em, dị ứng đậu phộng..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `2px solid ${noteFocused ? '#f0c040' : '#e8d5a0'}`,
                  borderRadius: 12,
                  fontSize: 14,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  color: '#1e0f04',
                  background: '#fffbf0',
                  outline: 'none',
                  resize: 'none',
                  lineHeight: 1.65,
                  transition: 'border-color 0.2s',
                  boxShadow: noteFocused ? '0 0 0 3px rgba(240,192,64,0.15)' : 'none',
                }}
              />
            </div>
          </div>

          {/* Action area */}
          <div style={{ paddingTop: 16, paddingBottom: 28, borderTop: '1px solid rgba(200,160,80,0.15)' }}>

            {/* Error banner */}
            {showError && (
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                background: 'rgba(185,28,28,0.08)',
                border: '1px solid rgba(185,28,28,0.25)',
                borderRadius: 10,
                padding: '10px 14px',
                marginBottom: 14,
                animation: 'tabletFadeIn 0.3s ease-out both',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#b91c1c', marginBottom: 1, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    Không thể xác thực mã QR
                  </div>
                  <div style={{ fontSize: 11.5, color: 'rgba(153,27,27,0.75)', lineHeight: 1.5, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    Mã QR không khả dụng hoặc ngoài phạm vi nhà hàng. Vui lòng thử lại hoặc liên hệ nhân viên.
                  </div>
                </div>
                <button
                  onClick={() => setShowError(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(185,28,28,0.5)', fontSize: 20, lineHeight: 1, padding: 0, flexShrink: 0 }}
                >
                  ×
                </button>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={handleStart}
              disabled={!isSuccess}
              style={{
                width: '100%',
                padding: '18px',
                background: isSuccess
                  ? 'linear-gradient(135deg, #b8860b 0%, #d4a820 25%, #f0c040 55%, #d4a820 80%, #b8860b 100%)'
                  : 'rgba(200,160,80,0.2)',
                backgroundSize: '200% auto',
                border: 'none',
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 800,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                color: isSuccess ? '#1e0f04' : 'rgba(150,100,50,0.45)',
                cursor: isSuccess ? 'pointer' : 'not-allowed',
                letterSpacing: '0.1em',
                boxShadow: isSuccess ? '0 8px 32px rgba(212,168,32,0.45)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'all 0.4s ease',
                animation: isSuccess ? 'tabletShimmer 3s linear infinite' : 'none',
              }}
            >
              {isSuccess ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 2h3l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.97-1.67L23 6H5"/>
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  </svg>
                  BẮT ĐẦU ĐẶT MÓN
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(150,100,50,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  Vui lòng quét mã QR trước
                </>
              )}
            </button>

            <div style={{
              textAlign: 'center',
              marginTop: 12,
              fontSize: 11,
              color: 'rgba(150,100,50,0.4)',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              lineHeight: 1.55,
            }}>
              Nhiều khách có thể cùng quét QR để gọi món chung trên một bàn
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
