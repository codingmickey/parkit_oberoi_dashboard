import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import useAuth from '../Hooks/useAuth';
import useLoadingAuth from '../Hooks/useLoadingAuth';

import axiosPrivateInstance from '../api/Axios/privateInstance';
import { AxiosRequestConfig } from 'axios';

export default function PersistAuth() {
  const { auth, setAuth } = useAuth();
  const { setLoadingAuth } = useLoadingAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    setAuth({ ...auth, token: token });

    // const abortController = new AbortController();

    // const getAuth = async () => {
    //   setLoadingAuth(true);
    //   try {
    //     const options: AxiosRequestConfig = {
    //       url: 'toll/getAuth',
    //       method: 'GET',
    //       signal: abortController.signal
    //     };
    //     const resp = await axiosPrivateInstance.request(options);
    //     setAuth({
    //       email: resp.data.emailId,
    //       spaceProviderId: resp.data.id
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   } finally {
    //     setLoadingAuth(false);
    //   }
    // };

    // getAuth();

    // return () => {
    //   abortController.abort();
    // };
  }, []);

  return <Outlet />;
}
