import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { OrderItem, CartItem, OrderStatus } from '../../types'
import { ALL_DISHES } from '../../data'

interface OrderState {
  orders: OrderItem[]
  submittedAt: string // ISO date string
}

const DEMO_ORDERS: OrderItem[] = [
  { dish: ALL_DISHES[2], qty: 2, selectedModifiers: ['Không cay', 'Nước sốt thêm'], status: 'served' },
  { dish: ALL_DISHES[3], qty: 1, selectedModifiers: ['Ít cay'], status: 'preparing' },
  { dish: ALL_DISHES[7], qty: 1, selectedModifiers: ['Ít đá'], status: 'sent' },
  { dish: ALL_DISHES[5], qty: 1, selectedModifiers: ['Không cay'], status: 'preparing' },
]

const initialState: OrderState = {
  orders: DEMO_ORDERS,
  submittedAt: new Date('2025-09-08T17:09:00').toISOString(),
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    submitOrder(state, action: PayloadAction<CartItem[]>) {
      state.orders = action.payload.map(item => ({
        ...item,
        status: 'sent' as const,
      }))
      state.submittedAt = new Date().toISOString()
    },
    updateOrderStatus(state, action: PayloadAction<{ id: number; status: OrderStatus }>) {
      const { id, status } = action.payload
      const item = state.orders.find(o => o.dish.id === id)
      if (item) {
        item.status = status
      }
    },
    clearOrders(state) {
      state.orders = []
    },
  },
})

export const { submitOrder, updateOrderStatus, clearOrders } = orderSlice.actions
export default orderSlice.reducer
