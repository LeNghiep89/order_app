import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TableState {
  tableId: string
  zone: string
  guests: number
  note: string
}

const initialState: TableState = {
  tableId: 'A1',
  zone: 'Khu A',
  guests: 2,
  note: '',
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setGuests(state, action: PayloadAction<number>) {
      state.guests = action.payload
    },
    setNote(state, action: PayloadAction<string>) {
      state.note = action.payload
    },
    setTableInfo(state, action: PayloadAction<{ tableId: string; zone: string }>) {
      state.tableId = action.payload.tableId
      state.zone = action.payload.zone
    },
    checkin(state, action: PayloadAction<{ guests: number; note: string }>) {
      state.guests = action.payload.guests
      state.note = action.payload.note
    },
  },
})

export const { setGuests, setNote, setTableInfo, checkin } = tableSlice.actions
export default tableSlice.reducer
