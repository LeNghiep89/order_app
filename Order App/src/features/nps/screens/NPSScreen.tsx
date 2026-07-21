import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { clearCart } from '../../../store/slices/cartSlice'
import { clearOrders } from '../../../store/slices/orderSlice'
import { checkin } from '../../../store/slices/tableSlice'
import { goTo, setViewportMode } from '../../../store/slices/navigationSlice'
import { microcopy } from '../../../locales/vi'

export default function NPSScreen() {
  const dispatch = useAppDispatch()
  const tableId = useAppSelector(state => state.table.tableId)
  const zone = useAppSelector(state => state.table.zone)
  const viewportMode = useAppSelector(state => state.navigation.viewportMode)

  // Form states
  const [score, setScore] = useState<number>(7)
  const [reasons, setReasons] = useState<string[]>([])
  const [otherComment, setOtherComment] = useState('')
  const [showThankYou, setShowThankYou] = useState(false)
  
  // Simulation helpers
  const [simOffline, setSimOffline] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Clear checklist & text values instantly if score >= 7
  useEffect(() => {
    if (score >= 7) {
      setReasons([])
      setOtherComment('')
    }
  }, [score])

  const handleReasonToggle = (reason: string) => {
    setReasons(prev =>
      prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
    )
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    // Generate mock order_id and session_id
    const orderId = `ORD-${tableId}-${Date.now().toString().slice(-6)}`
    const sessionId = `SES-${tableId}-${Math.floor(100000 + Math.random() * 900000)}`

    const payload = {
      order_id: orderId,
      table_id: tableId,
      session_id: sessionId,
      nps_score: score,
      reasons: score <= 6 ? reasons : [],
      other_comment: score <= 6 ? otherComment.trim() : '',
    }

    console.log('[NPS API] Gửi đánh giá:', payload)

    // Simulate instant operational alerts for staff
    if (score <= 6) {
      console.warn(
        `[STAFF ALERT] Cảnh báo: Bàn ${tableId} vừa đánh giá ${score}/9 điểm. Lý do: ${
          reasons.length > 0 ? reasons.join(', ') : 'Không nêu lý do cụ thể'
        }.${payload.other_comment ? ` Ý kiến khác: ${payload.other_comment}` : ''}`
      )
      showToast(microcopy.nps.managerAlert)
    }

    if (simOffline) {
      // Offline simulation: Cache rating locally
      const cached = localStorage.getItem('nps_offline_cache')
      const arr = cached ? JSON.parse(cached) : []
      arr.push({ ...payload, timestamp: new Date().toISOString() })
      localStorage.setItem('nps_offline_cache', JSON.stringify(arr))

      showToast('Đang gửi dữ liệu...')
      
      // Simulate background sync retry
      setTimeout(() => {
        console.log('[Background Sync] Đã đồng bộ đánh giá NPS lưu cache thành công lên máy chủ.')
        localStorage.removeItem('nps_offline_cache')
      }, 5000)
    } else {
      // Simulate successful API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
    }

    setSubmitting(false)
    setShowThankYou(true)
  }

  const handleCloseSession = () => {
    setShowThankYou(false)

    // Terminate table session and clear state
    dispatch(clearCart())
    dispatch(clearOrders())
    dispatch(checkin({ guests: 2, note: '' }))

    // Route based on screen mode
    if (viewportMode === 'tablet') {
      dispatch(setViewportMode('tablet'))
      dispatch(goTo('tablet-checkin'))
    } else {
      dispatch(setViewportMode('mobile'))
      dispatch(goTo('scanner'))
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1e0f04',
      color: '#fdf3e3',
      fontFamily: "'Be Vietnam Pro', sans-serif",
      padding: '24px 20px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed', top: 65, zIndex: 9999,
          background: 'rgba(239,68,68,0.95)', color: '#fff',
          padding: '12px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700,
          boxShadow: '0 8px 32px rgba(239,68,68,0.3)',
          animation: 'slideIn 0.3s ease-out',
        }}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ width: '100%', maxWidth: 430, textAlign: 'center', marginTop: 16, marginBottom: 20 }}>
        <img
          src="/logo.png"
          alt="Madame Lân Logo"
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            objectFit: 'cover',
            boxShadow: '0 4px 18px rgba(168,36,36,0.4)',
            marginBottom: 8,
          }}
        />
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, color: '#f0c040', letterSpacing: '0.02em' }}>
          Madame Lân
        </div>
        <div style={{ fontSize: 11, color: 'rgba(240,192,64,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
          Đánh giá dịch vụ · Bàn {tableId} ({zone})
        </div>
      </div>

      {/* Main card form */}
      <div style={{
        width: '100%', maxWidth: 430,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(240,192,64,0.2)',
        borderRadius: 18,
        padding: '24px 20px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Question */}
        <div style={{
          textAlign: 'center', fontSize: 15, fontWeight: 600, color: '#fdf3e3',
          lineHeight: 1.55, marginBottom: 24, padding: '0 10px',
        }}>
          Bạn có sẵn lòng giới thiệu bạn bè đến dùng bữa ở Madame Lân không?
        </div>

        {/* NPS Scale 1 - 9 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginBottom: 14 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
            const isSelected = score === num
            let btnBg = 'rgba(255, 255, 255, 0.04)'
            let btnColor = 'rgba(253, 243, 227, 0.7)'
            let btnBorder = '1px solid rgba(240,192,64,0.2)'

            if (isSelected) {
              btnColor = '#1e0f04'
              btnBorder = '1px solid #f0c040'
              if (num <= 6) {
                // Detractor color (soft red/coral)
                btnBg = 'linear-gradient(135deg, #e85038, #f06a54)'
                btnBorder = '1px solid #f06a54'
              } else {
                // Promoter color (brand gold)
                btnBg = 'linear-gradient(135deg, #c9a227, #f0c040)'
              }
            }

            return (
              <button
                key={num}
                onClick={() => setScore(num)}
                style={{
                  flex: 1, height: 42, borderRadius: 10,
                  background: btnBg, border: btnBorder, color: btnColor,
                  fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                }}
              >
                {num}
              </button>
            )
          })}
        </div>

        {/* Labels under rating scale */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px', marginBottom: 28 }}>
          <span style={{ fontSize: 11, color: 'rgba(253,243,227,0.45)' }}>1: Rất không sẵn lòng</span>
          <span style={{ fontSize: 11, color: 'rgba(253,243,227,0.45)' }}>9: Rất sẵn lòng</span>
        </div>

        {/* Conditional Dynamic checklist for score 1-6 */}
        {score <= 6 && (
          <div style={{
            background: 'rgba(255,250,230,0.03)',
            borderRadius: 12, border: '1px dashed rgba(240,192,64,0.15)',
            padding: '16px 14px', marginBottom: 24,
            animation: 'slideIn 0.3s ease-out',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f0c040', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>
              Điều gì khiến bạn chưa hài lòng?
            </div>
            
            {/* Reasons checkbox list */}
            {[
              { id: 'taste', label: 'Thức ăn không ngon' },
              { id: 'service', label: 'Dịch vụ kém' },
              { id: 'ambiance', label: 'Không gian, tiện nghi kém' },
            ].map(item => {
              const checked = reasons.includes(item.label)
              return (
                <label
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    marginBottom: 10, cursor: 'pointer', fontSize: 13.5, color: '#fdf3e3',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleReasonToggle(item.label)}
                    style={{
                      accentColor: '#f0c040', width: 16, height: 16, cursor: 'pointer',
                    }}
                  />
                  {item.label}
                </label>
              )
            })}

            {/* Other comments field */}
            <div style={{ marginTop: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(253,243,227,0.6)', marginBottom: 8 }}>
                Ý kiến đóng góp khác (Tùy chọn)
              </label>
              <textarea
                value={otherComment}
                onChange={e => setOtherComment(e.target.value.slice(0, 500))}
                placeholder="Nhập ý kiến của bạn tại đây (tối đa 500 ký tự)..."
                rows={3}
                style={{
                  width: '100%', padding: '10px 12px',
                  background: 'rgba(30,15,4,0.4)', border: '1px solid rgba(240,192,64,0.2)',
                  borderRadius: 8, color: '#fdf3e3', fontSize: 13, outline: 'none',
                  resize: 'none', fontFamily: "'Be Vietnam Pro', sans-serif", lineHeight: 1.5,
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#f0c040' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(240,192,64,0.2)' }}
              />
              <div style={{ textAlign: 'right', fontSize: 10.5, color: 'rgba(253,243,227,0.3)', marginTop: 4 }}>
                {otherComment.length}/500 ký tự
              </div>
            </div>
          </div>
        )}

        {/* Submit rating button */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            width: '100%', padding: '15px',
            background: submitting
              ? 'rgba(240,192,64,0.4)'
              : 'linear-gradient(135deg, #b8860b 0%, #d4a820 35%, #f0c040 65%, #d4a820 100%)',
            border: 'none', borderRadius: 12,
            color: submitting ? 'rgba(30,15,4,0.5)' : '#1e0f04', fontSize: 15, fontWeight: 800,
            cursor: submitting ? 'default' : 'pointer', letterSpacing: '0.06em',
            boxShadow: submitting ? 'none' : '0 4px 20px rgba(240,192,64,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: "'Be Vietnam Pro', sans-serif",
          }}
        >
          {submitting ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M12 2a10 10 0 1 0 10 10" />
              </svg>
              ĐANG GỬI...
            </>
          ) : (
            'GỬI ĐÁNH GIÁ'
          )}
        </button>
      </div>

      {/* Simulator Tools (Offline mock toggler) */}
      <div style={{
        marginTop: 36, width: '100%', maxWidth: 430,
        background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)',
        borderRadius: 12, padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 11.5, color: 'rgba(253,243,227,0.45)' }}>Mô phỏng mất kết nối mạng (Timeout)</span>
        <input
          type="checkbox"
          checked={simOffline}
          onChange={e => setSimOffline(e.target.checked)}
          style={{ accentColor: '#f0c040', cursor: 'pointer' }}
        />
      </div>

      {/* Thank you Popup Modal */}
      {showThankYou && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(10,4,1,0.65)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <div style={{
            width: '100%', maxWidth: 380,
            background: '#fff', color: '#1e0f04',
            borderRadius: 18, padding: '28px 24px 24px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            textAlign: 'center',
            animation: 'tabletSlideDown 0.35s cubic-bezier(0.32,0.72,0,1) both',
            border: score <= 6 ? '2px solid #ef4444' : '2px solid #22c55e',
          }}>
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: score <= 6 ? '#fef2f2' : '#f0fdf4',
              border: `2px solid ${score <= 6 ? '#ef4444' : '#22c55e'}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16,
              fontSize: 24,
            }}>
              {score <= 6 ? '🛎️' : '❤️'}
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 19, color: '#1e0f04', marginBottom: 10 }}>
              {score <= 6 ? 'Madame Lân đã ghi nhận' : 'Cảm ơn ý kiến của bạn!'}
            </div>
            <div style={{ fontSize: 13.5, color: '#6b4020', lineHeight: 1.6, marginBottom: 24, padding: '0 4px' }}>
              {score <= 6
                ? microcopy.nps.recoveryToast
                : 'Cảm ơn quý khách đã dành thời gian góp ý. Chúc quý khách có trải nghiệm tuyệt vời tại Madame Lân!'}
            </div>
            <button
              onClick={handleCloseSession}
              style={{
                width: '100%', padding: '13px',
                background: 'linear-gradient(135deg, #1e0f04 0%, #3d2010 100%)',
                border: 'none', borderRadius: 12,
                color: '#f0c040', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.04em',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                boxShadow: '0 4px 16px rgba(30,15,4,0.25)',
              }}
            >
              Hoàn tất & Quay về Trang chủ
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-16px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
