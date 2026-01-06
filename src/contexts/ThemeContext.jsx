import { ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { createContext, useMemo, useState, useEffect } from 'react';
import createAppTheme from '../styles/theme';

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });

  const [color, setColor] = useState(() => {
    return localStorage.getItem('themeColor') || 'purple';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('themeColor', color);
  }, [color]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createAppTheme(mode, color), [mode, color]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      setTheme: setMode,
      color,
      setColor,
    }),
    [mode, color]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;
