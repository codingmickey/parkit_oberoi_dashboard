import React, { createContext, useEffect, useState } from 'react';

interface ColorModeContextProps {
  theme: ThemeTypes;
  setTheme: React.Dispatch<React.SetStateAction<ThemeTypes>>;
}

interface ColorMoreProviderProps {
  children: React.ReactNode;
}

const ColorModeContext = createContext<ColorModeContextProps>({} as ColorModeContextProps);

export const ColorModeProvider = ({ children }: ColorMoreProviderProps) => {
  const lastSelectedColorMode = localStorage.getItem('colorMode');
  const [theme, setTheme] = useState<ThemeTypes>((lastSelectedColorMode as ThemeTypes) || 'dark');

  useEffect(() => {
    localStorage.setItem('colorMode', theme);
  }, [theme]);

  return <ColorModeContext.Provider value={{ theme, setTheme }}>{children}</ColorModeContext.Provider>;
};

export default ColorModeContext;
