import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { useEffect } from 'react';

export default function CheckAuth() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return <Outlet />;
}
