import './globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/dm-sans'

import App from '@/app'
import ProviderWrapper from '@/components/provider-wrapper'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <React.StrictMode>
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  </React.StrictMode>,
)
