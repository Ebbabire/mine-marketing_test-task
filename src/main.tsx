import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import App from './App.tsx'

/**
 * Redux Provider wraps the entire app so all components can access the store.
 * 
 * We place it here at the root level rather than in App.tsx because this
 * ensures the store is available even if App.tsx changes structure later.
 * The Provider uses React Context under the hood, so it needs to be above
 * any component that uses useAppSelector or useAppDispatch.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
