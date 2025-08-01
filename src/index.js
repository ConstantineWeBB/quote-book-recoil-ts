import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </RecoilRoot>
);
