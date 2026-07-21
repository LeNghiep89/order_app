import { useState } from 'react'
import type { Dish, CartItem, ComboGroup, SelectedComboSubItem, ComboCartSelection } from '../../../types'
import { fmt } from '../../../data'

interface ComboDetailSheetProps {
  dish: Dish
  existingCartItem?: CartItem // For editing an existing combo
  onClose: () => void
  onAdd: (item: CartItem) => void
}

export default function ComboDetailSheet({ dish, existingCartItem, onClose, onAdd }: ComboDetailSheetProps) {
  // Map of groupId -> SelectedComboSubItem[]
  const [selections, setSelections] = useState<Record<string, SelectedComboSubItem[]>>(() => {
    if (existingCartItem?.comboSelection) {
      const map: Record<string, SelectedComboSubItem[]> = {}
      existingCartItem.comboSelection.groups.forEach(g => {
        map[g.groupId] = [...g.items]
      })
      return map
    }
    const initialMap: Record<string, SelectedComboSubItem[]> = {}
    dish.groups?.forEach(g => {
      initialMap[g.id] = []
    })
    return initialMap
  })

  // General note for the combo
  const [comboNote, setComboNote] = useState(existingCartItem?.comboSelection?.comboNote || '')
  const [comboQty, setComboQty] = useState(existingCartItem?.qty || 1)

  // Sub-item modifier modal state
  const [activeSubModifier, setActiveSubModifier] = useState<{
    groupId: string
    dishId: number
    dishName: string
    availableModifiers: string[]
    currentNotes: string[]
  } | null>(null)

  const groups: ComboGroup[] = dish.groups || []

  // Calculate total extra fees from selected sub-items
  let totalExtraFee = 0
  groups.forEach(g => {
    const selectedList = selections[g.id] || []
    selectedList.forEach(item => {
      totalExtraFee += item.extraPrice * item.qty
    })
  })

  const unitComboPrice = dish.price + totalExtraFee
  const grandTotal = unitComboPrice * comboQty

  // Check if all groups satisfy their required quantities
  let totalMissing = 0
  const isSatisfied = groups.every(g => {
    const selectedList = selections[g.id] || []
    const currentQty = selectedList.reduce((sum, item) => sum + item.qty, 0)
    if (currentQty < g.requiredQty) {
      totalMissing += (g.requiredQty - currentQty)
      return false
    }
    return true
  })

  // Increment item in group
  const handleAddItem = (group: ComboGroup, opt: any) => {
    if (opt.isSoldOut) return
    const currentList = selections[group.id] || []
    const groupTotal = currentList.reduce((sum, i) => sum + i.qty, 0)
    if (groupTotal >= group.requiredQty) return

    const existingIdx = currentList.findIndex(i => i.dishId === opt.dishId)
    let updatedList: SelectedComboSubItem[] = []
    if (existingIdx >= 0) {
      updatedList = currentList.map((item, idx) =>
        idx === existingIdx ? { ...item, qty: item.qty + 1 } : item
      )
    } else {
      updatedList = [...currentList, { dishId: opt.dishId, dishName: opt.dishName, extraPrice: opt.extraPrice, qty: 1, notes: [] }]
    }

    setSelections({
      ...selections,
      [group.id]: updatedList,
    })
  }

  // Decrement item in group
  const handleRemoveItem = (group: ComboGroup, dishId: number) => {
    const currentList = selections[group.id] || []
    const existing = currentList.find(i => i.dishId === dishId)
    if (!existing) return

    let updatedList: SelectedComboSubItem[] = []
    if (existing.qty > 1) {
      updatedList = currentList.map(item =>
        item.dishId === dishId ? { ...item, qty: item.qty - 1 } : item
      )
    } else {
      updatedList = currentList.filter(item => item.dishId !== dishId)
    }

    setSelections({
      ...selections,
      [group.id]: updatedList,
    })
  }

  // Save sub-item modifiers
  const handleSaveSubModifier = (notes: string[]) => {
    if (!activeSubModifier) return
    const { groupId, dishId } = activeSubModifier
    const currentList = selections[groupId] || []

    const updatedList = currentList.map(item =>
      item.dishId === dishId ? { ...item, notes } : item
    )

    setSelections({
      ...selections,
      [groupId]: updatedList,
    })
    setActiveSubModifier(null)
  }

  // Handle final submit
  const handleAddToCart = () => {
    if (!isSatisfied) return

    const comboSelection: ComboCartSelection = {
      cartItemId: existingCartItem?.comboSelection?.cartItemId || `combo-${Date.now()}`,
      comboDish: dish,
      qty: comboQty,
      groups: groups.map(g => ({
        groupId: g.id,
        groupName: g.name,
        items: selections[g.id] || [],
      })),
      comboNote: comboNote.trim(),
    }

    const cartItem: CartItem = {
      dish: {
        ...dish,
        price: unitComboPrice,
      },
      qty: comboQty,
      selectedModifiers: [],
      isCombo: true,
      comboSelection,
    }

    onAdd(cartItem)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(10,4,1,0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      animation: 'fadeIn 0.2s ease-out',
    }}>
      {/* 800x600 Pop-over Modal Container */}
      <div style={{
        width: 820,
        height: 620,
        maxWidth: '96vw',
        maxHeight: '94vh',
        background: '#fdf8f0',
        borderRadius: 20,
        border: '1.5px solid #f0c040',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        position: 'relative',
      }}>

        {/* ═════════════════════════════════════════════════════════════════════
            MODAL HEADER BAR
        ═════════════════════════════════════════════════════════════════════ */}
        <div style={{
          padding: '16px 24px',
          background: 'linear-gradient(135deg, #1c0c03 0%, #2a1406 100%)',
          borderBottom: '1.5px solid rgba(240,192,64,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              background: 'linear-gradient(135deg, #b91c1c, #dc2626)',
              color: '#fff',
              fontSize: 11,
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: 6,
              letterSpacing: '0.08em',
              boxShadow: '0 2px 8px rgba(185,28,28,0.4)',
            }}>
              COMBO ƯU ĐÃI
            </span>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 19,
                color: '#f0c040',
                lineHeight: 1.1,
              }}>
                {dish.name}
              </div>
              <div style={{ fontSize: 11.5, color: 'rgba(240,192,64,0.6)', marginTop: 2 }}>
                Giá ưu đãi Combo: <strong style={{ color: '#fff' }}>{fmt(dish.price)}</strong>
                {dish.originalPrice && (
                  <span style={{ textDecoration: 'line-through', marginLeft: 6, color: 'rgba(240,192,64,0.4)' }}>
                    {fmt(dish.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(240,192,64,0.3)',
              color: '#f0c040',
              fontSize: 20,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            MODAL BODY (SCROLLABLE GROUPS & SUB-ITEMS)
        ═════════════════════════════════════════════════════════════════════ */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
        }} className="hide-scrollbar">

          {groups.map(group => {
            const selectedList = selections[group.id] || []
            const currentQty = selectedList.reduce((s, i) => s + i.qty, 0)
            const isGroupFull = currentQty >= group.requiredQty
            const isGroupSatisfied = currentQty === group.requiredQty

            return (
              <div
                key={group.id}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 18,
                  border: isGroupSatisfied ? '1.5px solid #bbf7d0' : '1.5px solid rgba(200,160,80,0.22)',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.04)',
                }}
              >
                {/* Group Progress Indicator Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                  paddingBottom: 10,
                  borderBottom: '1px solid rgba(200,160,80,0.18)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isGroupSatisfied ? '#16a34a' : '#d97706',
                    }} />
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: '#1e0f04' }}>
                      {group.name}
                    </span>
                  </div>

                  <span style={{
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 12,
                    background: isGroupSatisfied ? '#dcfce7' : '#fef3c7',
                    color: isGroupSatisfied ? '#15803d' : '#b45309',
                    border: isGroupSatisfied ? '1px solid #86efac' : '1px solid #fde68a',
                  }}>
                    Đã chọn {currentQty}/{group.requiredQty}
                  </span>
                </div>

                {/* Sub-item Options Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {group.options.map(opt => {
                    const selectedItem = selectedList.find(i => i.dishId === opt.dishId)
                    const itemQty = selectedItem?.qty || 0

                    return (
                      <div
                        key={opt.dishId}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: 10,
                          borderRadius: 14,
                          background: opt.isSoldOut
                            ? '#f3f4f6'
                            : itemQty > 0 ? '#fffbf0' : '#fafafa',
                          border: itemQty > 0 ? '1.5px solid #f0c040' : '1px solid #e5e7eb',
                          opacity: opt.isSoldOut ? 0.55 : 1,
                          position: 'relative',
                        }}
                      >
                        {/* Thumbnail */}
                        <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#3d2010' }}>
                          <img src={opt.image} alt={opt.dishName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {/* Title & Extra Fee */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e0f04', lineHeight: 1.25 }}>
                            {opt.dishName}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                            {opt.extraPrice > 0 ? (
                              <span style={{ fontSize: 11, fontWeight: 700, color: '#b82c0a' }}>
                                +{fmt(opt.extraPrice)}
                              </span>
                            ) : (
                              <span style={{ fontSize: 10.5, color: '#16a34a', fontWeight: 600 }}>
                                Không phụ thu
                              </span>
                            )}
                            {opt.isSoldOut && (
                              <span style={{ fontSize: 10, color: '#dc2626', fontWeight: 800, background: '#fee2e2', padding: '1px 5px', borderRadius: 4 }}>
                                Tạm hết
                              </span>
                            )}
                          </div>

                          {/* Sub-customization Trigger Button */}
                          {itemQty > 0 && opt.availableModifiers && opt.availableModifiers.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setActiveSubModifier({
                                groupId: group.id,
                                dishId: opt.dishId,
                                dishName: opt.dishName,
                                availableModifiers: opt.availableModifiers!,
                                currentNotes: selectedItem?.notes || [],
                              })}
                              style={{
                                marginTop: 4,
                                padding: '2px 8px',
                                borderRadius: 6,
                                background: '#fff',
                                border: '1px solid #e8d5a0',
                                fontSize: 10.5,
                                fontWeight: 700,
                                color: '#8a5c20',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                              }}
                            >
                              ⚙️ {selectedItem?.notes && selectedItem.notes.length > 0
                                ? selectedItem.notes.join(', ')
                                : 'Thêm khẩu vị'}
                            </button>
                          )}
                        </div>

                        {/* Stepper Controls (- 0 +) */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1.5px solid #e8d5a0',
                          borderRadius: 10,
                          overflow: 'hidden',
                          background: '#fff',
                        }}>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(group, opt.dishId)}
                            disabled={itemQty === 0}
                            style={{
                              width: 32,
                              height: 32,
                              border: 'none',
                              background: itemQty === 0 ? '#f3f4f6' : '#fff8e8',
                              color: itemQty === 0 ? '#d1d5db' : '#1e0f04',
                              cursor: itemQty === 0 ? 'default' : 'pointer',
                              fontSize: 16,
                              fontWeight: 700,
                            }}
                          >
                            −
                          </button>

                          <span style={{
                            width: 28,
                            textAlign: 'center',
                            fontSize: 13,
                            fontWeight: 800,
                            color: '#1e0f04',
                          }}>
                            {itemQty}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleAddItem(group, opt)}
                            disabled={isGroupFull || opt.isSoldOut}
                            style={{
                              width: 32,
                              height: 32,
                              border: 'none',
                              background: (isGroupFull || opt.isSoldOut)
                                ? '#f3f4f6'
                                : 'linear-gradient(135deg, #c9a227, #f0c040)',
                              color: (isGroupFull || opt.isSoldOut) ? '#9ca3af' : '#1e0f04',
                              cursor: (isGroupFull || opt.isSoldOut) ? 'not-allowed' : 'pointer',
                              fontSize: 16,
                              fontWeight: 700,
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* General Note for Combo */}
          <div style={{
            background: '#fff',
            borderRadius: 14,
            padding: 14,
            border: '1px solid rgba(200,160,80,0.2)',
          }}>
            <label style={{
              display: 'block',
              fontSize: 11.5,
              fontWeight: 800,
              color: '#8a5c20',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              Ghi chú chung cho Combo
            </label>
            <input
              type="text"
              value={comboNote}
              onChange={e => setComboNote(e.target.value)}
              placeholder="Ví dụ: Lên cùng lúc tất cả các món..."
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1.5px solid #e8d5a0',
                borderRadius: 10,
                fontSize: 13,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                color: '#1e0f04',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            MODAL FOOTER BAR (FIXED BOTTOM)
        ═════════════════════════════════════════════════════════════════════ */}
        <div style={{
          padding: '14px 24px',
          background: '#fff',
          borderTop: '1.5px solid rgba(200,160,80,0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          {/* Combo Quantity Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#7a5030' }}>Số lượng Combo:</span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #e8d5a0',
              borderRadius: 12,
              overflow: 'hidden',
              background: '#fffbf0',
            }}>
              <button
                type="button"
                onClick={() => setComboQty(Math.max(1, comboQty - 1))}
                style={{
                  width: 38,
                  height: 38,
                  border: 'none',
                  background: comboQty <= 1 ? '#f5ead5' : 'linear-gradient(135deg, #e8d590, #f0c040)',
                  cursor: comboQty <= 1 ? 'default' : 'pointer',
                  fontSize: 18,
                  color: comboQty <= 1 ? '#c8b880' : '#1e0f04',
                }}
              >
                −
              </button>
              <span style={{ width: 36, textAlign: 'center', fontSize: 16, fontWeight: 800, color: '#1e0f04' }}>
                {comboQty}
              </span>
              <button
                type="button"
                onClick={() => setComboQty(comboQty + 1)}
                style={{
                  width: 38,
                  height: 38,
                  border: 'none',
                  background: 'linear-gradient(135deg, #c9a227, #f0c040)',
                  cursor: 'pointer',
                  fontSize: 18,
                  color: '#1e0f04',
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Add CTA Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isSatisfied}
            style={{
              flex: 1,
              height: 48,
              background: isSatisfied
                ? 'linear-gradient(135deg, #b8860b 0%, #d4a820 30%, #f0c040 60%, #d4a820 100%)'
                : '#e5e7eb',
              border: 'none',
              borderRadius: 12,
              fontSize: 14.5,
              fontWeight: 800,
              fontFamily: "'Be Vietnam Pro', sans-serif",
              color: isSatisfied ? '#1e0f04' : '#9ca3af',
              cursor: isSatisfied ? 'pointer' : 'not-allowed',
              letterSpacing: '0.04em',
              boxShadow: isSatisfied ? '0 6px 20px rgba(240,192,64,0.4)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {isSatisfied ? (
              <>
                <span>THÊM COMBO VÀO BỮA ĂN</span>
                <span>—</span>
                <span>{fmt(grandTotal)}</span>
              </>
            ) : (
              <span>VUI LÒNG CHỌN ĐỦ MÓN (CÒN THIẾU {totalMissing} MÓN)</span>
            )}
          </button>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            SUB-ITEM MODIFIER POPUP MODAL
        ═════════════════════════════════════════════════════════════════════ */}
        {activeSubModifier && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}>
            <div style={{
              width: 380,
              background: '#fff',
              borderRadius: 16,
              padding: 20,
              boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
              border: '1.5px solid #f0c040',
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: '#1e0f04', marginBottom: 4 }}>
                Khẩu vị: {activeSubModifier.dishName}
              </div>
              <div style={{ fontSize: 11.5, color: '#8a6040', marginBottom: 14 }}>
                Chọn tùy chỉnh riêng cho món con trong Combo:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                {activeSubModifier.availableModifiers.map(mod => {
                  const isChecked = activeSubModifier.currentNotes.includes(mod)
                  return (
                    <label key={mod} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          const newNotes = isChecked
                            ? activeSubModifier.currentNotes.filter(n => n !== mod)
                            : [...activeSubModifier.currentNotes, mod]
                          setActiveSubModifier({ ...activeSubModifier, currentNotes: newNotes })
                        }}
                        style={{ accentColor: '#f0c040', width: 16, height: 16 }}
                      />
                      {mod}
                    </label>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={() => handleSaveSubModifier(activeSubModifier.currentNotes)}
                style={{
                  width: '100%',
                  padding: 12,
                  background: 'linear-gradient(135deg, #c9a227, #f0c040)',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#1e0f04',
                  cursor: 'pointer',
                }}
              >
                Xác nhận khẩu vị
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
