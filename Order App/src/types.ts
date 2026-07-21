export type Screen = 'scanner' | 'checkin' | 'loading' | 'menu' | 'cart' | 'order' | 'payment' | 'tablet-checkin' | 'nps'

export interface ComboSubOption {
  dishId: number
  dishName: string
  image: string
  extraPrice: number
  isSoldOut?: boolean
  availableModifiers?: string[]
}

export interface ComboGroup {
  id: string
  name: string
  requiredQty: number
  options: ComboSubOption[]
}

export interface Dish {
  id: number
  name: string
  desc: string
  price: number
  originalPrice?: number
  image: string
  category: string
  modifiers?: string[]
  isCombo?: boolean
  groups?: ComboGroup[]
  isSoldOut?: boolean
}

export interface SelectedComboSubItem {
  dishId: number
  dishName: string
  extraPrice: number
  qty: number
  notes?: string[]
}

export interface ComboCartSelection {
  cartItemId: string
  comboDish: Dish
  qty: number
  groups: {
    groupId: string
    groupName: string
    items: SelectedComboSubItem[]
  }[]
  comboNote?: string
}

export interface CartItem {
  dish: Dish
  qty: number
  selectedModifiers: string[]
  isCombo?: boolean
  comboSelection?: ComboCartSelection
}

export type OrderStatus = 'sent' | 'preparing' | 'served'

export interface OrderItem extends CartItem {
  status: OrderStatus
  round?: number
}
