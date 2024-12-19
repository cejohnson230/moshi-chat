import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AdvertisersDataSetProvider } from './hooks/useAdvertisersDataSet.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdvertisersDataSetProvider>
      <App />
    </AdvertisersDataSetProvider>
  </StrictMode>,
)
