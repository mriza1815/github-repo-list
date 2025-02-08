import { configureStore } from '@reduxjs/toolkit'
import { tableSlice } from './slices/tableSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, tableSlice.reducer)

const store = configureStore({
  reducer: {
    table: persistedReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);
export default store;