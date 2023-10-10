import { disableReactDevTools } from '@fvilers/disable-react-devtools';

//routes
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import routes from './routes';

//styling stuff
import { ConfigProvider } from 'antd';
import './Styles/CSS/Global/App.css';
import useColorMode from './Hooks/useColorMode.tsx';
import type { ThemeConfig } from 'antd';
import { theme as t } from 'antd';

const router = createBrowserRouter(createRoutesFromElements(routes));

function App() {
  const { theme } = useColorMode();
  const antTheme: ThemeConfig = {
    token: {},
    algorithm: theme === 'dark' ? t.darkAlgorithm : t.defaultAlgorithm
  };

  if (import.meta.env.VITE_NODE_ENV === 'production') {
    disableReactDevTools();
  }

  return (
    <>
      <ConfigProvider theme={antTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;
