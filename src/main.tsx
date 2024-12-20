import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AdvertisersDataSetProvider } from './hooks/useAdvertisersDataSet.tsx'
import { BrandDataProvider } from './hooks/useBrandData'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrandDataProvider>
      <AdvertisersDataSetProvider>
        <App />
      </AdvertisersDataSetProvider>
    </BrandDataProvider>
  </StrictMode>,
)
