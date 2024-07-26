import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const { VITE_NODE_ENV, VITE_PROD_API, VITE_DEV_API } = import.meta.env

  const base_url = VITE_NODE_ENV === 'production' ? VITE_PROD_API : VITE_DEV_API;

  const [auth, setAuth] = useState({
    authenticated: false,
    user: null
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const checkAuth = async () => {
      try {
        const { data } = await axios.get(base_url + '/auth/check-auth');
        if (data.authenticated) {
          setAuth({
            authenticated: data.authenticated,
            user: data.user
          })
        } else {
          setAuth({
            authenticated: false,
            user: null
          })
        };
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          setAuth({ authenticated: false, user: null });
        };
      };
    };


    checkAuth();


    return () => {
      source.cancel('Rerquest canceled on unmount.');
      setAuth(null);
    }

  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
export { AuthProvider, AuthContext };

