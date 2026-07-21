export type Screen = 'scanner' | 'checkin' | 'loading' | 'menu' | 'cart' | 'order' | 'payment' | 'tablet-checkin' | 'nps'

export interface Dish {
  id: number
  name: string
  desc: string
  price: number
  originalPrice?: number
  image: string
  category: string
  modifiers?: string[]
}

export interface CartItem {
  dish: Dish
  qty: number
  selectedModifiers: string[]
}

export type OrderStatus = 'sent' | 'preparing' | 'served'

export interface OrderItem extends CartItem {
  status: OrderStatus
}
