import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SortProps } from '../../types'

// Define a type for the slice state
interface TableState {
    currentPage: number,
    sortBy: SortProps,
    selectedLang: string,
    searchKeyword: string
}

// Define the initial state using that type
const initialState: TableState = {
  currentPage: 1,
  sortBy: "stars",
  selectedLang: "javascript",
  searchKeyword: "",
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload as SortProps
    },
    setSelectedLang: (state, action: PayloadAction<string>) => {
      state.selectedLang = action.payload
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload 
    }
}})

export const { setCurrentPage, setSortBy, setSelectedLang, setSearchKeyword } = tableSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentPage = (state: RootState) => state.table.currentPage

export default tableSlice.reducer