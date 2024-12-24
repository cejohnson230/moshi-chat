import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AdvertisersDataSetProvider } from './hooks/useAdvertisersDataSet.tsx'
import { BrandDataProvider } from './hooks/useBrandData'
import React from 'react'
import { UserProvider } from './contexts/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <BrandDataProvider>
    <UserProvider>
      <AdvertisersDataSetProvider>
        <App />
      </AdvertisersDataSetProvider>
      </UserProvider>
    </BrandDataProvider>
    
  </StrictMode>,
)
