import { useState } from 'react'
import NavBar from '../components/NavBar/NavBar';
import { validateEmailFormat, validatePasswordFormat } from '../../utils/validations';
import Loading from '../components/Loader/Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const SignIn = () => {

  const initialForm = { 'email': '', 'password': '' }
  const initialErr = { 'email': '', 'password': '', isValid: false }
  const [form, setForm] = useState(initialForm);
  const [err, setErr] = useState(initialErr);
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;
  const { auth, setAuth } = useContext(GlobalContext);



  const navigate = useNavigate();

  const validateEmail = (form) => {
    const validEmail = validateEmailFormat(form.email);
    if (validEmail) setErr({ ...err, email: '', isValid: true });
    if (!validEmail) setErr({ ...err, email: 'Invalid format', isValid: false });
    if (!form.email) setErr({ ...err, email: 'email is required', isValid: false })
  };

  const validatePassword = (form) => {
    const validPass = validatePasswordFormat(form.password);
    if (validPass) setErr({ ...err, password: '', isValid: true });
    if (!validPass) setErr({ ...err, password: 'min: 8 - max: 20 - 1 uppercase - 1 Special character', isValid: false });
    if (!form.password) setErr({ ...err, password: 'password is required', isValid: false })
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    name === 'email' && validateEmail({
      ...form,
      [name]: value
    });
    name === 'password' && validatePassword({
      ...form,
      [name]: value
    });

    setForm({
      ...form,
      [name]: value
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: user } = await axios.post(`${baseURL}/auth/login`, form, { withCredentials: true });
      setAuth({ ...auth, authenticated: true })

      toast.success('Logged In Successfully!')
      setForm(initialForm);
      navigate('/blocks')
      return user;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);

      } else {
        toast.error('An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }



  const disableButton = !Object.values(form).every(Boolean) || !err.isValid
  return (
    <>
      <NavBar />
      <div className="p-4 flex items-center justify-center h-[75vh]">
        {loading ?
          <Loading />
          :
          <div className="regForm ">
            <h1 className="text-lg font-bold text-center mb-2">Sign In</h1>
            <form onSubmit={handleSubmit}>
              <label className="input input-bordered flex items-center gap-2 min-w-[30vw]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email"
                  name='email' value={form.email}
                  onChange={handleFormChange} />
              </label>
              <p className='text-orange-500 ml-2 min-h-8'>{err.email}</p>
              <label className="input input-bordered flex items-center gap-2 min-w-[30vw]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input type="password" className="grow" placeholder="password" onChange={handleFormChange} name='password' value={form.password} />
              </label>
              <p className='text-orange-500 ml-2 min-h-8'>{err.password}</p>

              <div className='text-center'>
                <button
                  className='btn btn-sm mt-2 border border-slate-700 w-32 disabled:border-slate-500 disabled:text-slate-400 cursor-pointer'
                  type="submit"
                  disabled={disableButton}>
                  Sign In
                </button>
              </div>
            </form>
          </div>}

      </div>
    </>
  )
}

export default SignIn