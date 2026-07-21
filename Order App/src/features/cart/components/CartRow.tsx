import { useState } from 'react'
import type { CartItem } from '../../../types'
import { fmt } from '../../../data'

interface CartRowProps {
  item: CartItem
  onChange: (qty: number) => void
  onDelete: () => void
}

export default function CartRow({ item, onChange, onDelete }: CartRowProps) {
  const [confirming, setConfirming] = useState(false)

  const handleMinus = () => {
    if (item.qty === 1) {
      setConfirming(true)
    } else {
      onChange(item.qty - 1)
    }
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      marginBottom: 10,
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      border: '1px solid rgba(200,160,80,0.15)',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', gap: 12, padding: '12px', alignItems: 'flex-start' }}>
        {/* Photo */}
        <div style={{ width: 70, height: 70, borderRadius: 9, overflow: 'hidden', flexShrink: 0, background: '#4a2810' }}>
          <img src={item.dish.image} alt={item.dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 14, color: '#1e0f04', lineHeight: 1.25, marginBottom: 5 }}>
            {item.dish.name}
          </div>
          {item.selectedModifiers.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 7 }}>
              {item.selectedModifiers.map(m => (
                <span
                  key={m}
                  style={{
                    fontSize: 11,
                    color: '#8a5c20',
                    background: '#fff8e8',
                    border: '1px solid #e8d5a0',
                    borderRadius: 10,
                    padding: '2px 8px',
                    fontWeight: 500,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          )}
          <div style={{ fontSize: 15, fontWeight: 700, color: '#b82c0a' }}>
            {fmt(item.dish.price * item.qty)}
          </div>
          {item.qty > 1 && (
            <div style={{ fontSize: 11, color: '#a08060', marginTop: 1 }}>
              {fmt(item.dish.price)} × {item.qty}
            </div>
          )}
        </div>

        {/* Delete */}
        <button
          onClick={() => {
            setConfirming(false)
            onDelete()
          }}
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#fff0f0',
            border: '1.5px solid #fca5a5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Qty selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 12px 12px',
        gap: 0,
      }}>
        {confirming ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#e11d48', fontWeight: 500 }}>Xoá khỏi giỏ?</span>
            <button
              onClick={onDelete}
              style={{
                padding: '4px 12px',
                borderRadius: 8,
                background: '#e11d48',
                border: 'none',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Xoá
            </button>
            <button
              onClick={() => setConfirming(false)}
              style={{
                padding: '4px 12px',
                borderRadius: 8,
                background: '#f5f5f5',
                border: 'none',
                color: '#555',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Giữ lại
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '2px solid #e8d5a0', borderRadius: 10, overflow: 'hidden', background: '#fffbf0' }}>
            <button
              onClick={handleMinus}
              style={{
                width: 38,
                height: 36,
                border: 'none',
                background: 'linear-gradient(135deg, #f5e8b0, #f0c040)',
                cursor: 'pointer',
                fontSize: 20,
                color: '#1e0f04',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              −
            </button>
            <div style={{ width: 38, textAlign: 'center', fontSize: 16, fontWeight: 700, color: '#1e0f04', fontFamily: "'Playfair Display', serif" }}>
              {item.qty}
            </div>
            <button
              onClick={() => onChange(item.qty + 1)}
              style={{
                width: 38,
                height: 36,
                border: 'none',
                background: 'linear-gradient(135deg, #c9a227, #f0c040)',
                cursor: 'pointer',
                fontSize: 20,
                color: '#1e0f04',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
