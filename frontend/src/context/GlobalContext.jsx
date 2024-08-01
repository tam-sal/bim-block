import { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {

  const { VITE_NODE_ENV, VITE_PROD_API, VITE_DEV_API } = import.meta.env

  const base_url = VITE_NODE_ENV === 'production' ? VITE_PROD_API : VITE_DEV_API;

  const [auth, setAuth] = useState({
    authenticated: false,
    user: null
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getAuth = async () => {
      const { data } = await axios.get(`${base_url}/auth/check-auth`, {
        withCredentials: true
      });
      if (data.authenticated) {
        const { authenticated, user } = data;
        setAuth({ authenticated, user })
      }
    }

    getAuth();
    const handleBeforeUnload = async () => {
      setAuth({ authenticated: false, user: null });
      await axios.post(`${base_url}/auth/logout`, {}, { withCredentials: true });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      source.cancel('Rerquest AUTH canceled on unmount.');
      setAuth({});
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }

  }, [base_url]);


  return (
    <GlobalContext.Provider value={{ auth, setAuth }}>
      {children}
    </GlobalContext.Provider>
  )
}
export { GlobalProvider, GlobalContext };

