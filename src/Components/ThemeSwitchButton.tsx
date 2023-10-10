import { Segmented } from 'antd';
import useColorMode from '../Hooks/useColorMode';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

export default function ThemeSwitchButton() {
  const { theme, setTheme } = useColorMode();
  const location = useLocation();

  return (
    <Segmented
      style={{
        marginRight: '12px',
        backgroundColor: `${location.pathname === '/' && '#5A5A5A'}`
      }}
      value={theme}
      onChange={(e) => setTheme(e as ThemeTypes)}
      options={[
        {
          value: 'light',
          icon: <BsSun style={{ color: `var(--highlight-yellow)` }} />
        },
        {
          value: 'dark',
          icon: <BsMoon style={{ color: `var(--font-color)` }} />
        }
      ]}
    />
  );
}
