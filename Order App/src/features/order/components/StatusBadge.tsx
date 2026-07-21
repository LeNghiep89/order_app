import type { OrderStatus } from '../../../types'
import { microcopy } from '../../../locales/vi'

export const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; color: string; dot: string }> = {
  sent:      { label: microcopy.orderTracking.statusSent,      bg: '#f3f4f6', color: '#4b5563', dot: '#9ca3af' },
  preparing: { label: microcopy.orderTracking.statusPreparing, bg: '#fffbeb', color: '#d97706', dot: '#f59e0b' },
  served:    { label: microcopy.orderTracking.statusServed,    bg: '#f0fdf4', color: '#16a34a', dot: '#22c55e' },
}

interface StatusBadgeProps {
  status: OrderStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = STATUS_CONFIG[status]
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: c.bg,
      borderRadius: 20,
      padding: '5px 10px',
      border: `1px solid ${c.dot}33`,
    }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.dot, boxShadow: `0 0 4px ${c.dot}` }}/>
      <span style={{ fontSize: 11.5, fontWeight: 700, color: c.color, whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
        {c.label}
      </span>
    </div>
  )
}
