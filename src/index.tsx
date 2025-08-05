import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const container = document.getElementById('root');
if (!container) {
  throw new Error(
    "Root container not found. Make sure there is a DOM element with id 'root'."
  );
}

const root = ReactDOM.createRoot(container);
root.render(
  <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
  </RecoilRoot>
);
