import React, { createContext, useState } from 'react';

interface LoadingAuthContextProps {
  loadingAuth: boolean;
  setLoadingAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoadingAuthProps {
  children: React.ReactNode;
}

const LoadingAuthContext = createContext<LoadingAuthContextProps>({} as LoadingAuthContextProps);

export const LoadingAuthContextProvider = ({ children }: LoadingAuthProps) => {
  const [loadingAuth, setLoadingAuth] = useState(false);

  return <LoadingAuthContext.Provider value={{ loadingAuth, setLoadingAuth }}>{children}</LoadingAuthContext.Provider>;
};

export default LoadingAuthContext;
