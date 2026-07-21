import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { addToCart } from '../../../store/slices/cartSlice'
import { goTo } from '../../../store/slices/navigationSlice'
import { ALL_DISHES, CATEGORIES, fmt } from '../../../data'
import type { Dish } from '../../../types'
import { microcopy } from '../../../locales/vi'

import ItemDetailSheet from '../components/ItemDetailSheet'
import CartScreen from '../../cart/screens/CartScreen'

export default function MenuScreen() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart.cart)
  const orders = useAppSelector(state => state.order.orders)
  const guests = useAppSelector(state => state.table.guests)
  const tableId = useAppSelector(state => state.table.tableId)
  const viewportMode = useAppSelector(state => state.navigation.viewportMode)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tất cả')
  const [detail, setDetail] = useState<Dish | null>(null)

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.dish.price * i.qty, 0)
  const orderedCount = orders.reduce((s, i) => s + i.qty, 0)

  const isTablet = viewportMode === 'tablet'

  const filtered = ALL_DISHES.filter(d => {
    const matchCat = category === 'Tất cả' || d.category === category
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const grouped: Record<string, Dish[]> = {}
  filtered.forEach(d => {
    if (!grouped[d.category]) grouped[d.category] = []
    grouped[d.category].push(d)
  })

  // ─── TABLET LANDSCAPE 1024x768 MULTI-COLUMN LAYOUT ─────────────────────────
  if (isTablet) {
    return (
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        background: '#fdf8f0',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        overflow: 'hidden',
      }}>
        {/* ══════════════════════════════════════════════════════════════════════
            COLUMN 1: Left Navigation & Categories Sidebar (Width ~220px)
        ══════════════════════════════════════════════════════════════════════ */}
        <div style={{
          width: 220,
          height: '100vh',
          background: 'linear-gradient(180deg, #1c0c03 0%, #2a1406 100%)',
          borderRight: '1px solid rgba(240,192,64,0.2)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          zIndex: 20,
          boxShadow: '4px 0 20px rgba(0,0,0,0.25)',
        }}>
          {/* Brand Header */}
          <div style={{
            padding: '20px 16px 16px',
            borderBottom: '1px solid rgba(240,192,64,0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <img
              src="/logo.png"
              alt="Madame Lân Logo"
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                objectFit: 'cover',
                boxShadow: '0 3px 12px rgba(0,0,0,0.3)',
                marginBottom: 8,
              }}
            />
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 20,
              color: '#f0c040',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}>
              Madame Lân
            </div>
            <div style={{
              fontSize: 9.5,
              color: 'rgba(240,192,64,0.5)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginTop: 4,
            }}>
              Nhà hàng truyền thống
            </div>

            {/* Table Badge */}
            <div style={{
              marginTop: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(240,192,64,0.12)',
              border: '1px solid rgba(240,192,64,0.3)',
              borderRadius: 20,
              padding: '4px 12px',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f0c040" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#f0c040' }}>Bàn {tableId}</span>
              <span style={{ fontSize: 11, color: 'rgba(240,192,64,0.6)' }}>· {guests} khách</span>
            </div>
          </div>

          {/* Categories Title */}
          <div style={{
            padding: '16px 16px 8px',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.18em',
            color: 'rgba(240,192,64,0.45)',
            textTransform: 'uppercase',
          }}>
            Danh mục thực đơn
          </div>

          {/* Category List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 10px' }} className="hide-scrollbar">
            {CATEGORIES.map(cat => {
              const active = category === cat
              const count = cat === 'Tất cả'
                ? ALL_DISHES.length
                : ALL_DISHES.filter(d => d.category === cat).length

              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    marginBottom: 5,
                    borderRadius: 12,
                    border: active ? '1px solid rgba(240,192,64,0.5)' : '1px solid transparent',
                    background: active
                      ? 'linear-gradient(135deg, rgba(201,162,39,0.25), rgba(240,192,64,0.15))'
                      : 'transparent',
                    color: active ? '#f0c040' : 'rgba(253,243,227,0.7)',
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    minHeight: 44, // Touch target >= 44px
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {cat === 'Tất cả' && '🍱'}
                    {cat === 'Sợi' && '🍜'}
                    {cat === 'Bánh & Cuốn' && '🥢'}
                    {cat === 'Gà & Bò' && '🥩'}
                    {cat === 'Hải sản' && '🦐'}
                    {cat === 'Đồ uống' && '🍹'}
                    {cat === 'Tráng miệng' && '🍮'}
                    {cat}
                  </span>
                  <span style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: 10,
                    background: active ? 'rgba(240,192,64,0.3)' : 'rgba(255,255,255,0.06)',
                    color: active ? '#fff' : 'rgba(240,192,64,0.5)',
                  }}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Quick System Navigation Actions */}
          <div style={{
            padding: '12px 10px',
            borderTop: '1px solid rgba(240,192,64,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}>
            <button
              onClick={() => dispatch(goTo('order'))}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 10,
                background: 'rgba(240,192,64,0.08)',
                border: '1px solid rgba(240,192,64,0.2)',
                color: '#f0c040',
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Món đã gọi
              </span>
              {orderedCount > 0 && (
                <span style={{
                  background: '#22c55e',
                  color: '#fff',
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 10,
                }}>
                  {orderedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => dispatch(goTo('payment'))}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '10px 12px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(253,243,227,0.7)',
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Yêu cầu & Thanh toán
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            COLUMN 2: Main Menu Content Grid (Flex-1 / ~480px - 520px)
        ══════════════════════════════════════════════════════════════════════ */}
        <div style={{
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          background: '#fdf8f0',
        }} className="hide-scrollbar">

          {/* Sticky Search Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'rgba(253,248,240,0.95)',
            backdropFilter: 'blur(10px)',
            padding: '14px 20px',
            borderBottom: '1px solid rgba(200,160,80,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            {/* Search Input */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              border: '1.5px solid #e8d5a0',
              borderRadius: 12,
              padding: '10px 14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={microcopy.menu.searchPlaceholder}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 13.5,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  color: '#1e0f04',
                  background: 'transparent',
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a08060', fontSize: 16 }}
                >
                  ×
                </button>
              )}
            </div>

            {/* Category Title Display */}
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#8a5c20',
              background: '#fff3d5',
              padding: '8px 14px',
              borderRadius: 10,
              border: '1px solid #e8d5a0',
              flexShrink: 0,
            }}>
              {category} ({filtered.length})
            </div>
          </div>

          <div style={{ padding: '16px 20px 32px' }}>
            {/* Featured dishes banner */}
            {category === 'Tất cả' && !search && (
              <div style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 3.5, height: 16, borderRadius: 2, background: 'linear-gradient(180deg, #f0c040, #c9a227)' }} />
                  <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '0.14em', color: '#b8860b', textTransform: 'uppercase' }}>
                    {microcopy.menu.featuredTitle}
                  </span>
                </div>

                <div className="hide-scrollbar" style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4 }}>
                  {ALL_DISHES.filter(d => d.originalPrice).slice(0, 3).map(dish => (
                    <button
                      key={dish.id}
                      onClick={() => setDetail(dish)}
                      style={{
                        minWidth: 230,
                        borderRadius: 16,
                        overflow: 'hidden',
                        background: '#fff',
                        boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
                        border: '1.5px solid rgba(200,160,80,0.2)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        flexShrink: 0,
                        padding: 0,
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <div style={{ height: 120, background: '#3d2010', position: 'relative', overflow: 'hidden' }}>
                        <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          background: 'linear-gradient(135deg, #d63031, #e84393)',
                          color: '#fff',
                          fontSize: 10.5,
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: 6,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        }}>
                          -{Math.round((1 - dish.price / dish.originalPrice!) * 100)}% GỢI Ý
                        </div>
                      </div>
                      <div style={{ padding: '10px 12px 12px' }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14, color: '#1e0f04', marginBottom: 4 }}>
                          {dish.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                            <span style={{ fontSize: 15, fontWeight: 800, color: '#b82c0a' }}>{fmt(dish.price)}</span>
                            <span style={{ fontSize: 11, color: '#a08060', textDecoration: 'line-through' }}>{fmt(dish.originalPrice!)}</span>
                          </div>
                          <span style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #c9a227, #f0c040)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 16, color: '#1e0f04', fontWeight: 700,
                          }}>+</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Food items grid grouped by category */}
            {Object.entries(grouped).map(([cat, dishes]) => (
              <div key={cat} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 3.5, height: 16, borderRadius: 2, background: 'linear-gradient(180deg, #f0c040, #c9a227)' }} />
                  <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '0.16em', color: '#8a5c20', textTransform: 'uppercase' }}>
                    {cat}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                }}>
                  {dishes.map(dish => (
                    <div
                      key={dish.id}
                      onClick={() => setDetail(dish)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#fff',
                        borderRadius: 14,
                        overflow: 'hidden',
                        border: '1.5px solid rgba(200,160,80,0.18)',
                        boxShadow: '0 3px 14px rgba(0,0,0,0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ height: 125, background: '#4a2810', position: 'relative', overflow: 'hidden' }}>
                        <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {dish.originalPrice && (
                          <div style={{
                            position: 'absolute', top: 6, left: 6,
                            background: '#d63031', color: '#fff', fontSize: 9.5, fontWeight: 800,
                            padding: '2px 6px', borderRadius: 4,
                          }}>
                            Giảm giá
                          </div>
                        )}
                      </div>

                      <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 700,
                            fontSize: 14.5,
                            color: '#1e0f04',
                            marginBottom: 4,
                            lineHeight: 1.25,
                          }}>
                            {dish.name}
                          </div>
                          <div style={{
                            fontSize: 11.5,
                            color: '#7a5030',
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            marginBottom: 10,
                          }}>
                            {dish.desc}
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: 8,
                          borderTop: '1px dashed rgba(200,160,80,0.2)',
                        }}>
                          <div>
                            {dish.originalPrice && (
                              <div style={{ fontSize: 10.5, color: '#a08060', textDecoration: 'line-through', lineHeight: 1 }}>
                                {fmt(dish.originalPrice)}
                              </div>
                            )}
                            <div style={{ fontSize: 14.5, fontWeight: 800, color: '#b82c0a' }}>
                              {fmt(dish.price)}
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setDetail(dish)
                            }}
                            style={{
                              height: 44,
                              padding: '0 14px',
                              borderRadius: 22,
                              background: 'linear-gradient(135deg, #c9a227 0%, #f0c040 100%)',
                              border: 'none',
                              color: '#1e0f04',
                              fontSize: 12.5,
                              fontWeight: 700,
                              fontFamily: "'Be Vietnam Pro', sans-serif",
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                              boxShadow: '0 3px 10px rgba(240,192,64,0.35)',
                              flexShrink: 0,
                            }}
                          >
                            <span>+</span>
                            <span>Thêm</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            COLUMN 3: Sticky Embedded Right Sidebar / Order Cart (~340px)
        ══════════════════════════════════════════════════════════════════════ */}
        <div style={{
          width: 340,
          height: '100vh',
          borderLeft: '1px solid rgba(200,160,80,0.25)',
          flexShrink: 0,
          background: '#fff',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.06)',
          zIndex: 15,
        }}>
          <CartScreen isSidebar />
        </div>

        {/* Item detail modal */}
        {detail && (
          <ItemDetailSheet
            dish={detail}
            onClose={() => setDetail(null)}
            onAdd={item => {
              dispatch(addToCart(item))
              setDetail(null)
            }}
          />
        )}
      </div>
    )
  }

  // Mobile layout rendering fallback
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#fdf8f0' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'linear-gradient(135deg, #1a0a02 0%, #2e1508 100%)',
        borderBottom: '1px solid rgba(240,192,64,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: '#f0c040' }}>
            Madame Lân
          </div>
          <div style={{ fontSize: 12, color: '#f0c040' }}>Bàn {tableId}</div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {ALL_DISHES.map(dish => (
          <div key={dish.id} onClick={() => setDetail(dish)} style={{ background: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, cursor: 'pointer' }}>
            <div style={{ fontWeight: 700 }}>{dish.name}</div>
            <div>{fmt(dish.price)}</div>
          </div>
        ))}
      </div>

      {cartCount > 0 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, padding: 16, background: '#fff' }}>
          <button onClick={() => dispatch(goTo('cart'))} style={{ width: '100%', padding: 14, background: '#f0c040', border: 'none', borderRadius: 10, fontWeight: 700 }}>
            XEM GIỎ HÀNG ({cartCount} món) — {fmt(cartTotal)}
          </button>
        </div>
      )}

      {detail && (
        <ItemDetailSheet
          dish={detail}
          onClose={() => setDetail(null)}
          onAdd={item => {
            dispatch(addToCart(item))
            setDetail(null)
          }}
        />
      )}
    </div>
  )
}
