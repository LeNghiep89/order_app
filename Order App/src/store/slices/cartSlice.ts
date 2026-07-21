import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Dish } from '../../types'
import { ALL_DISHES } from '../../data'

interface CartState {
  cart: CartItem[]
}

const DEMO_CART: CartItem[] = [
  { dish: ALL_DISHES[2], qty: 2, selectedModifiers: ['Không cay', 'Nước sốt thêm'] },
  { dish: ALL_DISHES[3], qty: 1, selectedModifiers: ['Ít cay'] },
  { dish: ALL_DISHES[7], qty: 1, selectedModifiers: ['Ít đá'] },
]

const initialState: CartState = {
  cart: DEMO_CART,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload
      if (item.isCombo && item.comboSelection) {
        const idx = state.cart.findIndex(
          i => i.isCombo && i.comboSelection?.cartItemId === item.comboSelection?.cartItemId
        )
        if (idx >= 0) {
          state.cart[idx] = item
        } else {
          state.cart.push(item)
        }
      } else {
        const idx = state.cart.findIndex(
          i =>
            !i.isCombo &&
            i.dish.id === item.dish.id &&
            JSON.stringify(i.selectedModifiers) === JSON.stringify(item.selectedModifiers)
        )
        if (idx >= 0) {
          state.cart[idx].qty += item.qty
        } else {
          state.cart.push(item)
        }
      }
    },
    changeCartQtyByIndex(state, action: PayloadAction<{ index: number; qty: number }>) {
      const { index, qty } = action.payload
      if (state.cart[index]) {
        state.cart[index].qty = qty
        if (state.cart[index].qty <= 0) {
          state.cart.splice(index, 1)
        }
      }
    },
    deleteFromCartByIndex(state, action: PayloadAction<number>) {
      state.cart.splice(action.payload, 1)
    },
    changeCartQty(state, action: PayloadAction<{ id: number; qty: number }>) {
      const { id, qty } = action.payload
      const item = state.cart.find(i => i.dish.id === id)
      if (item) {
        item.qty = qty
      }
      state.cart = state.cart.filter(i => i.qty > 0)
    },
    deleteFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(i => i.dish.id !== action.payload)
    },
    addUpsell(state, action: PayloadAction<Dish>) {
      const dish = action.payload
      const idx = state.cart.findIndex(i => i.dish.id === dish.id)
      if (idx >= 0) {
        state.cart[idx].qty += 1
      } else {
        state.cart.push({ dish, qty: 1, selectedModifiers: [] })
      }
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const { addToCart, changeCartQty, changeCartQtyByIndex, deleteFromCart, deleteFromCartByIndex, addUpsell, clearCart } = cartSlice.actions
export default cartSlice.reducer
