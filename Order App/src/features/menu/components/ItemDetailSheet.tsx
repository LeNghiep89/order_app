import { useState } from 'react'
import { useAppSelector } from '../../../store'
import type { Dish, CartItem } from '../../../types'
import { fmt } from '../../../data'
import { microcopy } from '../../../locales/vi'

interface ItemDetailSheetProps {
  dish: Dish
  onClose: () => void
  onAdd: (item: CartItem) => void
}

export default function ItemDetailSheet({ dish, onClose, onAdd }: ItemDetailSheetProps) {
  const viewportMode = useAppSelector(state => state.navigation.viewportMode)
  const isTablet = viewportMode === 'tablet'

  const [qty, setQty] = useState(1)
  const [portion, setPortion] = useState<'standard' | 'large'>('standard')
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([])
  const [extras, setExtras] = useState<string[]>([])
  const [customNote, setCustomNote] = useState('')

  // Portion extra price
  const portionExtra = portion === 'large' ? 25000 : 0

  // Available Extras for dishes
  const availableExtras = [
    { id: 'extra_1', name: 'Thêm trứng chèn / ốp la', price: 12000 },
    { id: 'extra_2', name: 'Bánh quẩy giòn Madame Lân', price: 10000 },
    { id: 'extra_3', name: 'Sốt chấm đặc sản thêm', price: 15000 },
  ]

  const extrasPrice = extras.reduce((sum, item) => {
    const found = availableExtras.find(e => e.name === item)
    return sum + (found ? found.price : 0)
  }, 0)

  const unitPrice = dish.price + portionExtra + extrasPrice
  const totalPrice = unitPrice * qty

  const toggleModifier = (m: string) => {
    setSelectedModifiers(prev =>
      prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]
    )
  }

  const toggleExtra = (extraName: string) => {
    setExtras(prev =>
      prev.includes(extraName) ? prev.filter(x => x !== extraName) : [...prev, extraName]
    )
  }

  const handleAddCart = () => {
    const finalModifiers: string[] = []
    if (portion === 'large') finalModifiers.push('Suất Đặc Biệt (+25K)')
    selectedModifiers.forEach(m => finalModifiers.push(m))
    extras.forEach(e => finalModifiers.push(e))
    if (customNote.trim()) finalModifiers.push(`Ghi chú: ${customNote.trim()}`)

    onAdd({
      dish: {
        ...dish,
        price: unitPrice,
      },
      qty,
      selectedModifiers: finalModifiers,
    })
    onClose()
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(15, 7, 2, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isTablet ? '24px' : '12px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: isTablet ? 620 : 440,
          background: '#fffdf9',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 24px 72px rgba(0,0,0,0.5), 0 0 0 1px rgba(240,192,64,0.3)',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Header bar / Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 10,
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'rgba(30,15,4,0.65)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(240,192,64,0.3)',
            color: '#fff',
            fontSize: 22,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          ×
        </button>

        {/* Scrollable Content Area */}
        <div style={{ flex: 1, overflowY: 'auto' }} className="hide-scrollbar">
          {/* Dish Hero Image Banner */}
          <div style={{ position: 'relative', height: isTablet ? 220 : 180, background: '#1e0f04' }}>
            <img
              src={dish.image}
              alt={dish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(30,15,4,0.1) 0%, rgba(30,15,4,0.85) 100%)',
            }} />

            {/* Title & Tag on Hero */}
            <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #c9a227, #f0c040)',
                color: '#1e0f04',
                fontSize: 11,
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: 12,
                marginBottom: 6,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {dish.category}
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: isTablet ? 24 : 20,
                color: '#fff',
                lineHeight: 1.2,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}>
                {dish.name}
              </div>
            </div>
          </div>

          {/* Details & Customizations */}
          <div style={{ padding: '20px 22px 10px' }}>
            {/* Description */}
            <div style={{
              fontSize: 13,
              color: '#6b4525',
              lineHeight: 1.6,
              marginBottom: 18,
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}>
              {dish.desc}
            </div>

            {/* Base Price Display */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 10,
              paddingBottom: 16,
              borderBottom: '1px dashed rgba(200,160,80,0.3)',
              marginBottom: 18,
            }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#b82c0a' }}>
                {fmt(unitPrice)}
              </span>
              {dish.originalPrice && (
                <span style={{ fontSize: 14, color: '#a08060', textDecoration: 'line-through' }}>
                  {fmt(dish.originalPrice)}
                </span>
              )}
              {portionExtra > 0 && (
                <span style={{ fontSize: 11.5, color: '#b8860b', fontWeight: 600, background: '#fef3c7', padding: '2px 8px', borderRadius: 8 }}>
                  +Suất lớn
                </span>
              )}
            </div>

            {/* Section 1: Portion Size Selection */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                fontSize: 11.5,
                fontWeight: 800,
                color: '#8a5c20',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                1. Chọn Khẩu phần
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setPortion('standard')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 14,
                    border: portion === 'standard' ? '2px solid #f0c040' : '1.5px solid #e0cca0',
                    background: portion === 'standard' ? 'linear-gradient(135deg, #fffbf0, #fffaeb)' : '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: portion === 'standard' ? '0 3px 12px rgba(240,192,64,0.2)' : 'none',
                    minHeight: 48,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e0f04' }}>Tô chuẩn vừa</div>
                  <div style={{ fontSize: 11.5, color: '#8a6040', marginTop: 2 }}>Khẩu phần tiêu chuẩn</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPortion('large')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 14,
                    border: portion === 'large' ? '2px solid #f0c040' : '1.5px solid #e0cca0',
                    background: portion === 'large' ? 'linear-gradient(135deg, #fffbf0, #fffaeb)' : '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: portion === 'large' ? '0 3px 12px rgba(240,192,64,0.2)' : 'none',
                    minHeight: 48,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1e0f04', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Suất đặc biệt</span>
                    <span style={{ color: '#b82c0a' }}>+25K</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: '#8a6040', marginTop: 2 }}>Thêm thịt & bánh phở</div>
                </button>
              </div>
            </div>

            {/* Section 2: Kitchen Preference Modifiers */}
            {dish.modifiers && dish.modifiers.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: 'block',
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: '#8a5c20',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}>
                  2. Khẩu vị & Ghi chú chế biến
                </label>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {dish.modifiers.map(m => {
                    const active = selectedModifiers.includes(m)
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => toggleModifier(m)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 20,
                          border: active ? '1.5px solid #f0c040' : '1.5px solid #e0cca0',
                          background: active ? 'linear-gradient(135deg, #c9a227, #f0c040)' : '#fff',
                          color: active ? '#1e0f04' : '#6b4525',
                          fontSize: 12.5,
                          fontWeight: active ? 700 : 500,
                          cursor: 'pointer',
                          minHeight: 44, // Touch target >= 44px
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        {active && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1e0f04" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        {m}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Section 3: Extra Side Dishes / Add-ons */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                fontSize: 11.5,
                fontWeight: 800,
                color: '#8a5c20',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                3. Thêm món ăn kèm
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {availableExtras.map(extra => {
                  const active = extras.includes(extra.name)
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 12,
                        border: active ? '1.5px solid #f0c040' : '1px solid #e8d5a0',
                        background: active ? '#fffbf0' : '#fff',
                        cursor: 'pointer',
                        minHeight: 44,
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: '#1e0f04' }}>
                        {extra.name}
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: '#b82c0a' }}>
                        +{fmt(extra.price)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Section 4: Special Note Input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                fontSize: 11.5,
                fontWeight: 800,
                color: '#8a5c20',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                {microcopy.customization.noteLabel}
              </label>
              <input
                type="text"
                value={customNote}
                onChange={e => setCustomNote(e.target.value)}
                placeholder={microcopy.customization.notePlaceholder}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1.5px solid #e8d5a0',
                  borderRadius: 12,
                  fontSize: 13,
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  color: '#1e0f04',
                  background: '#fff',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer Bar: Quantity Counter + Confirm Button */}
        <div style={{
          padding: '16px 22px',
          background: '#fff',
          borderTop: '1px solid rgba(200,160,80,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}>
          {/* Quantity Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '2px solid #e8d5a0',
            borderRadius: 14,
            overflow: 'hidden',
            background: '#fffbf0',
          }}>
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              style={{
                width: 46,
                height: 46, // Touch target >= 44px
                border: 'none',
                background: qty <= 1 ? '#f5ead5' : 'linear-gradient(135deg, #e8d590, #f0c040)',
                cursor: qty <= 1 ? 'default' : 'pointer',
                fontSize: 22,
                color: qty <= 1 ? '#c8b880' : '#1e0f04',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              −
            </button>
            <div style={{
              width: 44,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 800,
              color: '#1e0f04',
              fontFamily: "'Playfair Display', serif",
            }}>
              {qty}
            </div>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              style={{
                width: 46,
                height: 46,
                border: 'none',
                background: 'linear-gradient(135deg, #c9a227, #f0c040)',
                cursor: 'pointer',
                fontSize: 22,
                color: '#1e0f04',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              +
            </button>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddCart}
            style={{
              flex: 1,
              height: 48, // Touch target height >= 48px
              background: 'linear-gradient(135deg, #b8860b 0%, #d4a820 40%, #f0c040 70%, #d4a820 100%)',
              border: 'none',
              borderRadius: 14,
              fontSize: 14.5,
              fontWeight: 800,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              color: '#1e0f04',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              boxShadow: '0 6px 20px rgba(240,192,64,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {microcopy.customization.addCta(fmt(totalPrice))}
          </button>
        </div>
      </div>
    </div>
  )
}
