import {useContext} from 'react';

import {ThemeContext} from '@/stores/theme';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }
  return context;
}
