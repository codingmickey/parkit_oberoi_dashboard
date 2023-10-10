import { useContext } from 'react';
import LoadingAuthContext from '../Contexts/AuthLoadingProvider';

const useLoadingAuth = () => {
  return useContext(LoadingAuthContext);
};

export default useLoadingAuth;
