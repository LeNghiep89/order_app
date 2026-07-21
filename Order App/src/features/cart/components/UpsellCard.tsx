import type { Dish } from '../../../types'
import { fmt } from '../../../data'

interface UpsellCardProps {
  dish: Dish
  onAdd: () => void
}

export default function UpsellCard({ dish, onAdd }: UpsellCardProps) {
  return (
    <div style={{
      minWidth: 130,
      flexShrink: 0,
      background: '#fff',
      borderRadius: 13,
      border: '1px solid rgba(200,160,80,0.18)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{ height: 88, background: '#4a2810', position: 'relative' }}>
        <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </div>
      <div style={{ padding: '8px 9px 10px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 12, color: '#1e0f04', marginBottom: 3, lineHeight: 1.3, minHeight: 30 }}>
          {dish.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#b82c0a' }}>{fmt(dish.price)}</span>
          <button
            onClick={onAdd}
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a227, #f0c040)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              color: '#1e0f04',
              fontWeight: 300,
              boxShadow: '0 2px 6px rgba(240,192,64,0.4)',
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
