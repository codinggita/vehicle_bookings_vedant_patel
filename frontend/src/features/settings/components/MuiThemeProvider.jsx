import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * MuiThemeProvider
 * Integrates Material UI ThemeProvider, CssBaseline, and synchronizes the active
 * Redux theme mode with Tailwind CSS dark mode classes.
 */
const MuiThemeProvider = ({ children }) => {
  const themeMode = useSelector((state) => state.settings.theme);

  // Synchronize CSS baseline class for Tailwind CSS support
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const muiTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: '#6366f1', // Indigo 500
          light: '#818cf8',
          dark: '#4f46e5',
        },
        secondary: {
          main: '#a78bfa', // Violet 400
        },
        background: {
          default: themeMode === 'dark' ? '#020617' : '#f8fafc', // Slate 950 vs Slate 50
          paper: themeMode === 'dark' ? '#0f172a' : '#ffffff', // Slate 900 vs White
        },
        text: {
          primary: themeMode === 'dark' ? '#f1f5f9' : '#0f172a',
          secondary: themeMode === 'dark' ? '#94a3b8' : '#475569',
        },
        divider: themeMode === 'dark' ? '#1e293b' : '#e2e8f0',
      },
      typography: {
        fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: 12,
              fontWeight: 600,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              boxShadow: 'none',
              border: `1px solid ${themeMode === 'dark' ? '#1e293b' : '#e2e8f0'}`,
            },
          },
        },
      },
    });
  }, [themeMode]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
