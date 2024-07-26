import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

  const { VITE_NODE_ENV, VITE_PROD_API, VITE_DEV_API } = import.meta.env

  const base_url = VITE_NODE_ENV === 'production' ? VITE_PROD_API : VITE_DEV_API;

  const [auth, setAuth] = useState({
    authenticated: false,
    user: null
  });
  const [blocks, setBlocks] = useState([]);


  useEffect(() => {
    const source = axios.CancelToken.source();

    const checkAuth = async () => {
      try {
        const { data: logged } = await axios.get(`${base_url}/auth/check-auth`, {
          withCredentials: true,
          cancelToken: source.token,
        });
        console.log('Auth check response:', logged);

        if (logged.authenticated) {
          setAuth({
            authenticated: logged.authenticated,
            user: logged.user
          })
          const { data: blox } = await axios.get(`${base_url}/blocks`, {
            withCredentials: true,
            cancelToken: source.token,
          });
          setBlocks(blox?.blocks);
        } else {
          setAuth({
            authenticated: false,
            user: null
          })
        };
      } catch (error) {
        console.log(error.message)
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          setAuth({ authenticated: false, user: null });
          setBlocks(null);
        };
      };
    };


    checkAuth();


    return () => {
      source.cancel('Rerquest canceled on unmount.');
      setBlocks([]);
      setAuth({});
    }

  }, []);

  return (
    <GlobalContext.Provider value={{ auth, blocks }}>
      {children}
    </GlobalContext.Provider>
  )
}
export { GlobalProvider, GlobalContext };

