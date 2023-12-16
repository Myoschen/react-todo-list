import '@/globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/dm-sans'

import App from '@/app'
import Providers from '@/components/providers'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
)
