import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { goTo } from '../../../store/slices/navigationSlice'
import { fmt } from '../../../data'
import { microcopy } from '../../../locales/vi'
import QRGraphic from '../../checkin/components/QRGraphic'

export default function PaymentScreen() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(state => state.order.orders)
  const tableId = useAppSelector(state => state.table.tableId)
  const guests = useAppSelector(state => state.table.guests)
  const viewportMode = useAppSelector(state => state.navigation.viewportMode)

  const isTablet = viewportMode === 'tablet'

  const [paying, setPaying] = useState(false)
  const [method, setMethod] = useState<'qr' | 'card' | 'cash'>('qr')
  const [activeServiceToast, setActiveServiceToast] = useState<string | null>(null)
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoInput, setPromoInput] = useState('')

  const subtotal = orders.reduce((s, i) => s + i.dish.price * i.qty, 0)
  const vat = Math.round(subtotal * 0.08)

  const promoDiscount = appliedPromo === 'MADAME10'
    ? Math.round((subtotal + vat) * 0.1)
    : appliedPromo === 'BIRTHDAY'
      ? 50000
      : 0

  const total = Math.max(0, subtotal + vat - promoDiscount)

  const handleRequestService = (msg: string) => {
    setActiveServiceToast(msg)
    setTimeout(() => {
      setActiveServiceToast(null)
    }, 3000)
  }

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'MADAME10') {
      setAppliedPromo('MADAME10')
    } else if (promoInput.trim().toUpperCase() === 'BIRTHDAY') {
      setAppliedPromo('BIRTHDAY')
    }
  }

  const handleConfirmPayment = () => {
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      dispatch(goTo('nps'))
    }, 1200)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fdf8f0',
      fontFamily: "'Be Vietnam Pro', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ═══════════════════════════════════════════════════════════════════════
          HEADER BAR
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'linear-gradient(135deg, #1c0c03 0%, #2a1406 100%)',
        borderBottom: '1px solid rgba(240,192,64,0.25)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        padding: isTablet ? '12px 24px' : '12px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => dispatch(goTo('order'))}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(240,192,64,0.12)',
              border: '1px solid rgba(240,192,64,0.3)',
              borderRadius: 12,
              padding: '8px 14px',
              color: '#f0c040',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: 44, // Touch target >= 44px
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Quay lại Món đã gọi</span>
          </button>

          <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="Madame Lân Logo" style={{ width: 32, height: 32, borderRadius: 7, objectFit: 'cover' }} />
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: isTablet ? 20 : 17,
                color: '#f0c040',
                lineHeight: 1.1,
              }}>
                Yêu cầu Dịch vụ & Thanh toán
              </div>
              <div style={{ fontSize: 11, color: 'rgba(240,192,64,0.6)', marginTop: 2 }}>
                Thanh toán trực tiếp tại bàn hoặc yêu cầu phục vụ
              </div>
            </div>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(240,192,64,0.15)',
            border: '1px solid rgba(240,192,64,0.35)',
            borderRadius: 20,
            padding: '6px 14px',
          }}>
            <span style={{ fontSize: 12.5, color: '#f0c040', fontWeight: 800 }}>Bàn {tableId}</span>
            <span style={{ fontSize: 11, color: 'rgba(240,192,64,0.6)' }}>({guests} khách)</span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {activeServiceToast && (
        <div style={{
          position: 'fixed',
          top: 70,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          background: 'linear-gradient(135deg, #1c0c03, #2a1406)',
          border: '1.5px solid #f0c040',
          borderRadius: 14,
          padding: '12px 20px',
          color: '#f0c040',
          fontSize: 13,
          fontWeight: 700,
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <span>🔔</span>
          <span>{activeServiceToast}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN SPLIT SCREEN (1024x768 TABLET LANDSCAPE LAYOUT)
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        flex: 1,
        padding: isTablet ? '20px 24px' : '16px',
        display: 'flex',
        flexDirection: isTablet ? 'row' : 'column',
        gap: 20,
        maxWidth: 1024,
        margin: '0 auto',
        width: '100%',
      }}>
        {/* ═════════════════════════════════════════════════════════════════════
            LEFT COLUMN: Bill Breakdown & Quick Service Requests (Width 50%)
        ═════════════════════════════════════════════════════════════════════ */}
        <div style={{ flex: isTablet ? '1 1 50%' : '1', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Quick Service Requests Box */}
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '16px 18px',
            border: '1.5px solid rgba(200,160,80,0.22)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}>
            <div style={{
              fontSize: 11.5,
              fontWeight: 800,
              color: '#8a5c20',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span>🔔 Yêu cầu hỗ trợ nhanh tại bàn</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                onClick={() => handleRequestService(microcopy.serviceCheckout.callWaiterToast)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #fffbf0, #fff8e8)',
                  border: '1.5px solid #e8d5a0',
                  color: '#1e0f04',
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  minHeight: 48, // Touch target >= 48px
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                }}
              >
                <span style={{ fontSize: 18 }}>🔔</span>
                <span>{microcopy.serviceCheckout.callWaiterCta}</span>
              </button>

              <button
                onClick={() => handleRequestService('Đã gửi yêu cầu: Xin thêm nước chấm & ớt tươi')}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #fffbf0, #fff8e8)',
                  border: '1.5px solid #e8d5a0',
                  color: '#1e0f04',
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  minHeight: 48,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                }}
              >
                <span style={{ fontSize: 18 }}>🥣</span>
                <span>Xin thêm nước chấm / ớt</span>
              </button>

              <button
                onClick={() => handleRequestService('Đã gửi yêu cầu: Thay bát đũa & dĩa mới')}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #fffbf0, #fff8e8)',
                  border: '1.5px solid #e8d5a0',
                  color: '#1e0f04',
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  minHeight: 48,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                }}
              >
                <span style={{ fontSize: 18 }}>🥢</span>
                <span>Thay bát đũa / dĩa mới</span>
              </button>

              <button
                onClick={() => handleRequestService('Đã ghi nhận: Yêu cầu xuất hóa đơn đỏ VAT')}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #fffbf0, #fff8e8)',
                  border: '1.5px solid #e8d5a0',
                  color: '#1e0f04',
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  minHeight: 48,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                }}
              >
                <span style={{ fontSize: 18 }}>📄</span>
                <span>Xuất hóa đơn VAT</span>
              </button>
            </div>
          </div>

          {/* Promo code Section */}
          {(() => {
            const hasCombo = orders.some(i => i.isCombo)

            return (
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '16px 18px',
                border: hasCombo ? '1.5px solid #fde68a' : '1.5px solid rgba(200,160,80,0.22)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                opacity: hasCombo ? 0.75 : 1,
                position: 'relative',
              }}>
                <div style={{
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: '#8a5c20',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}>
                  Mã ưu đãi / Voucher giảm giá
                </div>

                {hasCombo ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: '#fffbf0',
                    border: '1px solid #f0c040',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#8a5c20',
                    lineHeight: 1.4,
                  }}>
                    <span>💡</span>
                    <span>Combo đã áp dụng giá ưu đãi đặc biệt, không áp dụng đồng thời cùng Voucher.</span>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                      <input
                        type="text"
                        value={promoInput}
                        onChange={e => setPromoInput(e.target.value)}
                        placeholder="Nhập mã (Ví dụ: MADAME10)"
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          border: '1.5px solid #e8d5a0',
                          borderRadius: 10,
                          fontSize: 13,
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          color: '#1e0f04',
                          outline: 'none',
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        style={{
                          padding: '10px 18px',
                          background: 'linear-gradient(135deg, #c9a227, #f0c040)',
                          border: 'none',
                          borderRadius: 10,
                          fontSize: 13,
                          fontWeight: 800,
                          color: '#1e0f04',
                          cursor: 'pointer',
                          minHeight: 44,
                        }}
                      >
                        Áp dụng
                      </button>
                    </div>

                    {/* Quick voucher chips */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => { setAppliedPromo('MADAME10'); setPromoInput('MADAME10') }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          border: appliedPromo === 'MADAME10' ? '1.5px solid #f0c040' : '1px dashed #e8d5a0',
                          background: appliedPromo === 'MADAME10' ? '#fef3c7' : '#fffbf0',
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: '#b8860b',
                          cursor: 'pointer',
                        }}
                      >
                        MADAME10 (-10%)
                      </button>

                      <button
                        type="button"
                        onClick={() => { setAppliedPromo('BIRTHDAY'); setPromoInput('BIRTHDAY') }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          border: appliedPromo === 'BIRTHDAY' ? '1.5px solid #f0c040' : '1px dashed #e8d5a0',
                          background: appliedPromo === 'BIRTHDAY' ? '#fef3c7' : '#fffbf0',
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: '#b8860b',
                          cursor: 'pointer',
                        }}
                      >
                        BIRTHDAY (-50K)
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          })()}

          {/* Detailed Itemized Bill */}
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '18px 20px',
            border: '1.5px solid rgba(200,160,80,0.22)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            flex: 1,
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 17,
              color: '#1e0f04',
              marginBottom: 12,
              paddingBottom: 10,
              borderBottom: '1.5px solid rgba(200,160,80,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span>Chi tiết hóa đơn bàn {tableId}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#8a6040', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {orders.reduce((s, i) => s + i.qty, 0)} phần món
              </span>
            </div>

            <div style={{ maxHeight: 220, overflowY: 'auto', paddingRight: 4, marginBottom: 12 }} className="hide-scrollbar">
              {orders.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                  <div style={{ flex: 1, paddingRight: 10 }}>
                    <div style={{ fontWeight: 600, color: '#1e0f04' }}>
                      {item.dish.name} <span style={{ color: '#b82c0a' }}>×{item.qty}</span>
                    </div>
                    {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                      <div style={{ fontSize: 11, color: '#8a5c20' }}>
                        {item.selectedModifiers.join(', ')}
                      </div>
                    )}
                  </div>
                  <div style={{ fontWeight: 700, color: '#1e0f04', flexShrink: 0 }}>
                    {fmt(item.dish.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: 10, borderTop: '1px dashed rgba(200,160,80,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: '#7a5030' }}>
                <span>Tạm tính</span>
                <span style={{ fontWeight: 600, color: '#1e0f04' }}>{fmt(subtotal)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: '#7a5030' }}>
                <span>Thuế VAT (8%)</span>
                <span style={{ fontWeight: 600, color: '#1e0f04' }}>{fmt(vat)}</span>
              </div>

              {promoDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#16a34a' }}>
                  <span>Chiết khấu Voucher ({appliedPromo})</span>
                  <span style={{ fontWeight: 700 }}>-{fmt(promoDiscount)}</span>
                </div>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 10,
                borderTop: '2px solid rgba(200,160,80,0.25)',
                alignItems: 'baseline',
              }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#1e0f04' }}>TỔNG CHÍNH THỨC</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#b82c0a', fontFamily: "'Playfair Display', serif" }}>
                  {fmt(total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            RIGHT COLUMN: Dynamic QR Code & Payment Confirmation (Width 50%)
        ═════════════════════════════════════════════════════════════════════ */}
        <div style={{ flex: isTablet ? '1 1 50%' : '1', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Payment Method Selector */}
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '14px 16px',
            border: '1.5px solid rgba(200,160,80,0.22)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}>
            <div style={{
              fontSize: 11.5,
              fontWeight: 800,
              color: '#8a5c20',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}>
              Phương thức thanh toán
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { id: 'qr', icon: '📱', label: 'Quét mã VietQR / MoMo / VNPay', sub: 'Tự động nhập đúng tiền & cú pháp' },
                { id: 'card', icon: '💳', label: 'Thẻ ngân hàng (Máy quẹt thẻ POS)', sub: 'Visa, Mastercard, JCB, Napas' },
                { id: 'cash', icon: '💵', label: 'Tiền mặt tại bàn', sub: 'Thanh toán trực tiếp cho nhân viên' },
              ].map(m => {
                const active = method === m.id
                return (
                  <div
                    key={m.id}
                    onClick={() => setMethod(m.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 12,
                      border: active ? '2px solid #f0c040' : '1px solid #e8d5a0',
                      background: active ? 'linear-gradient(135deg, #fffbf0, #fffaeb)' : '#fff',
                      cursor: 'pointer',
                      boxShadow: active ? '0 3px 12px rgba(240,192,64,0.2)' : 'none',
                      minHeight: 44,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: active ? 800 : 600, color: '#1e0f04' }}>{m.label}</div>
                      <div style={{ fontSize: 10.5, color: '#8a6040' }}>{m.sub}</div>
                    </div>
                    {active && (
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #c9a227, #f0c040)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Dynamic VietQR Payment Box */}
          <div style={{
            background: 'linear-gradient(180deg, #1c0c03 0%, #2a1406 100%)',
            borderRadius: 18,
            padding: 16,
            border: '1.5px solid rgba(240,192,64,0.3)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            flex: 1,
            justifyContent: 'space-between',
          }}>
            <div style={{ width: '100%' }}>
              <div style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.18em',
                color: 'rgba(240,192,64,0.7)',
                textTransform: 'uppercase',
                marginBottom: 2,
              }}>
                MÃ QR THANH TOÁN ĐỘNG (-30% SIZE)
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#f0c040', fontFamily: "'Playfair Display', serif" }}>
                {fmt(total)}
              </div>
            </div>

            {/* QR Code Container - Reduced by 30% */}
            <div style={{
              margin: '10px 0',
              padding: 10,
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 0 2px rgba(240,192,64,0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <QRGraphic tint="#1e0f04" cellSize={5} />
              <div style={{
                marginTop: 6,
                fontSize: 10.5,
                fontWeight: 700,
                color: '#1e0f04',
                background: '#fff3d5',
                padding: '3px 8px',
                borderRadius: 6,
                border: '1px solid #e8d5a0',
              }}>
                Nội dung: MADAMELAN BANA1
              </div>
            </div>

            <div style={{ width: '100%' }}>
              <div style={{ fontSize: 11.5, color: 'rgba(253,243,227,0.7)', marginBottom: 14 }}>
                Quét bằng ứng dụng Ngân hàng (VietQR) hoặc MoMo / ZaloPay
              </div>

              {/* Confirm Payment Button */}
              <button
                onClick={handleConfirmPayment}
                disabled={paying}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: paying
                    ? 'rgba(212,168,32,0.6)'
                    : 'linear-gradient(135deg, #b8860b 0%, #d4a820 30%, #f0c040 60%, #d4a820 100%)',
                  border: 'none',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 800,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  color: '#1e0f04',
                  cursor: paying ? 'default' : 'pointer',
                  letterSpacing: '0.08em',
                  boxShadow: paying ? 'none' : '0 6px 28px rgba(212,168,32,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  minHeight: 52, // Touch target height >= 48px
                }}
              >
                {paying ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M12 2a10 10 0 1 0 10 10" />
                    </svg>
                    {microcopy.serviceCheckout.processingPaymentCta.toUpperCase()}
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {microcopy.serviceCheckout.confirmPaymentCta.toUpperCase()}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
