import { store } from '@store/index';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import { Provider as StoreProvider } from 'react-redux';
import App from '@/App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </StrictMode>,
);
