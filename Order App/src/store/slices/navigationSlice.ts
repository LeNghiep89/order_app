import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Screen } from '../../types'

interface NavigationState {
  currentScreen: Screen
  showCheckinOverlay: boolean
  loading: boolean
  viewportMode: 'mobile' | 'tablet'
}

const initialState: NavigationState = {
  currentScreen: 'tablet-checkin',
  showCheckinOverlay: false,
  loading: false,
  viewportMode: 'tablet',
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    goTo(state, action: PayloadAction<Screen>) {
      state.currentScreen = action.payload
      state.showCheckinOverlay = false
      state.loading = false
    },
    setShowCheckin(state, action: PayloadAction<boolean>) {
      state.showCheckinOverlay = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setViewportMode(state, action: PayloadAction<'mobile' | 'tablet'>) {
      state.viewportMode = action.payload
    },
  },
})

export const { goTo, setShowCheckin, setLoading, setViewportMode } = navigationSlice.actions
export default navigationSlice.reducer
