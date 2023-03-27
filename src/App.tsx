import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { useState, useEffect } from 'react';
import { getUsers, loginUser } from './services/positions.server';

// ----------------------------------------------------------------------

export default function App() {
  const [user, setUser] = useState([])
  const loginInfo = {
    username: "lisa",
    password: "password"
  }
  useEffect(() => {
    // getUsers().then(res => res)
    loginUser(loginInfo).then(res => res)
  }, [])
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
