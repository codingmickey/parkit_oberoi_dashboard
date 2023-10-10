import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import useLoadingAuth from '../Hooks/useLoadingAuth';
import { checkingForNullObject } from '../utils/helperFunctions';

const RequireAuth = () => {
  const { auth } = useAuth();
  const { loadingAuth } = useLoadingAuth();
  const params = useParams();

  useEffect(() => {
    console.log(loadingAuth, params);
  }, [loadingAuth]);

  if (loadingAuth) {
    <p> Loading</p>;
  }

  // return <Outlet />;
  // return checkingForNullObject<Auth>(auth) ? <Navigate to="/" /> : <Outlet />;
  return localStorage.getItem('token') ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
