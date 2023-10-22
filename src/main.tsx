import './index.css';

import '@fontsource/noto-sans/300.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/500.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import ProviderWrapper from '@/components/provider-wrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  </React.StrictMode>,
);
