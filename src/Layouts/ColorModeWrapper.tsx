import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useColorMode from '../Hooks/useColorMode';

export default function ColorModeWrapper() {
  const { theme } = useColorMode();

  useEffect(() => {
    setColorSchemeInClassList(theme);
  }, [theme]);

  const setColorSchemeInClassList = (newColorScheme: ThemeTypes) => {
    if (newColorScheme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  };

  return <Outlet />;
}
