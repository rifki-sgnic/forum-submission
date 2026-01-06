import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { ThemeContextProvider } from './contexts/ThemeContext';
import store from './states';

import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import Notification from './components/Notification.jsx';
import ErrorPage from './pages/ErrorPage';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Provider store={store}>
          <SnackbarProvider>
            <BrowserRouter>
              <Notification />
              <App />
            </BrowserRouter>
          </SnackbarProvider>
        </Provider>
      </ErrorBoundary>
    </ThemeContextProvider>
  </StrictMode>
);
