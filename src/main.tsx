import ReactDOM from 'react-dom/client';
import App from './App.tsx';

//contexts
import { AuthProvider } from './Contexts/AuthProvider';
import { LoadingAuthContextProvider } from './Contexts/AuthLoadingProvider.tsx';
import { ColorModeProvider } from './Contexts/ColorModeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ColorModeProvider>
      <LoadingAuthContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoadingAuthContextProvider>
    </ColorModeProvider>
  </>
);
