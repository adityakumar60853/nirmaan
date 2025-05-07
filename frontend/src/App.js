import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';
import theme from './theme';
import AppRoutes from './routes';
import { AccessibilityProvider } from './context/AccessibilityContext';
import AccessibilityControls from './components/AccessibilityControls';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          <AccessibilityProvider>
            <Router>
              <div className="App">
                <Layout>
                  <AppRoutes />
                </Layout>
                <AccessibilityControls />
              </div>
            </Router>
          </AccessibilityProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
