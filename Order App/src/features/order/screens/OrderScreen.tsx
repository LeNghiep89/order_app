import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { goTo } from '../../../store/slices/navigationSlice'
import { fmt } from '../../../data'
import type { OrderStatus } from '../../../types'
import { microcopy } from '../../../locales/vi'

import StatusBadge, { STATUS_CONFIG } from '../components/StatusBadge'

export default function OrderScreen() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(state => state.order.orders)
  const submittedAtString = useAppSelector(state => state.order.submittedAt)
  const tableId = useAppSelector(state => state.table.tableId)
  const guests = useAppSelector(state => state.table.guests)
  const viewportMode = useAppSelector(state => state.navigation.viewportMode)

  const isTablet = viewportMode === 'tablet'

  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all')

  const submittedAt = new Date(submittedAtString)
  const subtotal = orders.reduce((s, i) => s + i.dish.price * i.qty, 0)
  const vat = Math.round(subtotal * 0.08)
  const total = subtotal + vat

  const ts = submittedAt.toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).replace(',', '')

  const sentItems = orders.filter(o => o.status === 'sent')
  const prepItems = orders.filter(o => o.status === 'preparing')
  const servedItems = orders.filter(o => o.status === 'served')

  const totalItemCount = orders.reduce((s, i) => s + i.qty, 0)

  // Filtered orders for mobile view
  const displayOrders = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus)

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
          {/* Back to Menu Button */}
          <button
            onClick={() => dispatch(goTo('menu'))}
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
            <span>+ GỌI THÊM MÓN</span>
          </button>

          {/* Title */}
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
                Danh sách món ăn đã gọi
              </div>
              <div style={{ fontSize: 11, color: 'rgba(240,192,64,0.6)', marginTop: 2 }}>
                Gọi lúc: <strong style={{ color: '#fff' }}>{ts}</strong> · {totalItemCount} phần món
              </div>
            </div>
          </div>

          {/* Table Badge */}
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
            <span style={{ fontSize: 11, color: 'rgba(240,192,64,0.6)' }}>({guests} người)</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN CONTENT AREA (TABLET LANDSCAPE 1024x768 vs MOBILE)
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{ flex: 1, padding: isTablet ? '20px 24px 100px' : '14px 16px 130px', overflowY: 'auto' }}>

        {/* Warm Toast Banner Confirmation */}
        <div style={{
          background: 'linear-gradient(135deg, #fffbf0, #fff7e6)',
          borderRadius: 14,
          padding: '14px 18px',
          marginBottom: 16,
          border: '1.5px solid #f0c040',
          boxShadow: '0 4px 16px rgba(240,192,64,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a227, #f0c040)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 18,
            color: '#1e0f04',
            boxShadow: '0 2px 8px rgba(240,192,64,0.3)',
          }}>
            👨‍🍳
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1e0f04', marginBottom: 2 }}>
              {microcopy.orderTracking.toastSuccess}
            </div>
            <div style={{ fontSize: 11.5, color: '#8a6040' }}>
              Chúc bạn có những phút giây dùng bữa ấm áp cùng gia đình & người thân.
            </div>
          </div>
        </div>

        {/* Global Progress Timeline Bar */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '16px 20px',
          marginBottom: 20,
          border: '1.5px solid rgba(200,160,80,0.2)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 800,
            color: '#8a5c20',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span>{microcopy.orderTracking.progressTitle}</span>
            <span style={{ color: '#22c55e', textTransform: 'none', fontSize: 12 }}>
              {servedItems.length}/{orders.length} món đã phục vụ
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {(['sent', 'preparing', 'served'] as OrderStatus[]).map((s, i) => {
              const c = STATUS_CONFIG[s]
              const counts = [sentItems.length, prepItems.length, servedItems.length]
              const active = counts[i] > 0
              return (
                <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                  {i > 0 && (
                    <div style={{
                      position: 'absolute',
                      left: '-50%',
                      right: '50%',
                      top: 14,
                      height: 3,
                      background: active ? c.dot : '#e5e7eb',
                      transition: 'background 0.3s',
                    }} />
                  )}
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: active ? c.dot : '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 6,
                    zIndex: 1,
                    boxShadow: active ? `0 0 12px ${c.dot}77` : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {s === 'sent' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#9ca3af'} strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    )}
                    {s === 'preparing' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#9ca3af'} strokeWidth="2.5">
                        <path d="M12 2a10 10 0 1 0 10 10" />
                      </svg>
                    )}
                    {s === 'served' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#9ca3af'} strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: active ? c.color : '#9ca3af', fontWeight: active ? 700 : 500, textAlign: 'center' }}>
                    {c.label} ({counts[i]})
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* TABLET LANDSCAPE 3-COLUMN STATUS GROUPS */}
        {isTablet ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            {/* Column 1: Bếp đã nhận đơn */}
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: 16,
              border: '1.5px solid #e5e7eb',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 12,
                marginBottom: 12,
                borderBottom: '2px solid #e5e7eb',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#6b7280' }} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#374151', letterSpacing: '0.05em' }}>
                    1. Bếp đã nhận đơn ({sentItems.length})
                  </span>
                </div>
              </div>

              {sentItems.length === 0 ? (
                <div style={{ padding: 24, textAlign: 'center', color: '#9ca3af', fontSize: 12.5 }}>
                  Không có món chờ
                </div>
              ) : (
                sentItems.map((item, idx) => (
                  <OrderItemCard key={idx} item={item} />
                ))
              )}
            </div>

            {/* Column 2: Bếp đang chế biến */}
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: 16,
              border: '1.5px solid #fde68a',
              boxShadow: '0 2px 10px rgba(217,119,6,0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 12,
                marginBottom: 12,
                borderBottom: '2px solid #fde68a',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#d97706' }} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#b45309', letterSpacing: '0.05em' }}>
                    2. Bếp đang chế biến ({prepItems.length})
                  </span>
                </div>
              </div>

              {prepItems.length === 0 ? (
                <div style={{ padding: 24, textAlign: 'center', color: '#9ca3af', fontSize: 12.5 }}>
                  Không có món đang nấu
                </div>
              ) : (
                prepItems.map((item, idx) => (
                  <OrderItemCard key={idx} item={item} />
                ))
              )}
            </div>

            {/* Column 3: Món ăn đã sẵn sàng */}
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: 16,
              border: '1.5px solid #bbf7d0',
              boxShadow: '0 2px 10px rgba(22,163,74,0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 12,
                marginBottom: 12,
                borderBottom: '2px solid #bbf7d0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#16a34a' }} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#15803d', letterSpacing: '0.05em' }}>
                    3. Món ăn đã sẵn sàng ({servedItems.length})
                  </span>
                </div>
              </div>

              {servedItems.length === 0 ? (
                <div style={{ padding: 24, textAlign: 'center', color: '#9ca3af', fontSize: 12.5 }}>
                  Chưa có món hoàn tất
                </div>
              ) : (
                servedItems.map((item, idx) => (
                  <OrderItemCard key={idx} item={item} />
                ))
              )}
            </div>
          </div>
        ) : (
          /* Mobile Single Column View */
          <div>
            {displayOrders.map((item, idx) => (
              <OrderItemCard key={idx} item={item} />
            ))}
          </div>
        )}

        {/* Overall Bill Summary */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '18px 20px',
          border: '1.5px solid rgba(200,160,80,0.2)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 16,
            color: '#1e0f04',
            marginBottom: 12,
            paddingBottom: 10,
            borderBottom: '1px solid rgba(200,160,80,0.2)',
          }}>
            Tóm tắt tổng đơn hàng tại bàn
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: '#7a5030' }}>Tạm tính ({totalItemCount} món)</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1e0f04' }}>{fmt(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottom: '1px dashed rgba(200,160,80,0.3)' }}>
            <span style={{ fontSize: 13, color: '#7a5030' }}>VAT (8%)</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1e0f04' }}>{fmt(vat)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: '#1e0f04' }}>Tổng tiền tạm tính</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#b82c0a', fontFamily: "'Playfair Display', serif" }}>
              {fmt(total)}
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          FIXED FOOTER ACTION BAR
      ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: '#fff', borderTop: '1px solid rgba(200,160,80,0.25)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        padding: '14px 24px',
      }}>
        <div style={{
          maxWidth: isTablet ? 1024 : 430,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 12, color: '#7a5030' }}>Tổng tạm tính hóa đơn:</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#b82c0a', fontFamily: "'Playfair Display', serif" }}>
              {fmt(total)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => dispatch(goTo('menu'))}
              style={{
                padding: '14px 20px',
                background: '#fff8e8',
                border: '1.5px solid #f0c040',
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 700,
                color: '#8a5c20',
                cursor: 'pointer',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                minHeight: 48,
              }}
            >
              + Gọi thêm món
            </button>

            <button
              onClick={() => dispatch(goTo('payment'))}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #b8860b 0%, #d4a820 30%, #f0c040 60%, #d4a820 100%)',
                border: 'none',
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 800,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                color: '#1e0f04',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                boxShadow: '0 6px 24px rgba(212,168,32,0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                minHeight: 48,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="2.5">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              YÊU CẦU & THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── HELPER COMPONENT FOR ORDER ITEM CARD ────────────────────────────────────
function OrderItemCard({ item }: { item: any }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      marginBottom: 10,
      border: '1px solid rgba(200,160,80,0.18)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}>
      <div style={{ height: 3, background: STATUS_CONFIG[item.status as OrderStatus].dot, opacity: 0.8 }} />
      <div style={{ display: 'flex', gap: 10, padding: 10 }}>
        <div style={{ width: 56, height: 56, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: '#4a2810' }}>
          <img src={item.dish.image} alt={item.dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13, color: '#1e0f04', lineHeight: 1.25 }}>
              {item.dish.name}
            </div>
            <StatusBadge status={item.status} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#b8860b', background: '#fff8e8', border: '1px solid #e8d5a0', borderRadius: 6, padding: '1px 6px' }}>
              Lần gọi {item.round || 1}
            </span>
            {item.selectedModifiers && item.selectedModifiers.map((m: string) => (
              <span key={m} style={{ fontSize: 10, color: '#8a5c20', background: '#fff8e8', border: '1px solid #e8d5a0', borderRadius: 6, padding: '1px 5px' }}>
                {m}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#374151', background: '#f3f4f6', padding: '2px 8px', borderRadius: 6 }}>
              x{item.qty} phần
            </span>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: '#b82c0a' }}>
              {fmt(item.dish.price * item.qty)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
