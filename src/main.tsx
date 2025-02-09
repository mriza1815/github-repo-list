import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from "react-router";
import store, { persistor } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import App from './pages/App/App.controller.tsx';
import Login from './pages/Login/Login.controller.tsx'
import './index.css'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import PageNotFound from './pages/PageNotFound.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <App />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<PageNotFound />}
                />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
