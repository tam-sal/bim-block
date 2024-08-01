import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';


function NavBar() {
  const { VITE_NODE_ENV, VITE_PROD_API, VITE_DEV_API } = import.meta.env;
  const { setAuth } = useContext(GlobalContext);

  const baseurl = VITE_NODE_ENV === 'production' ? VITE_PROD_API : VITE_DEV_API;
  const handleSignout = async () => {
    try {
      const signout = await axios.post(`${baseurl}/auth/logout`, {}, { withCredentials: true });
      await setAuth({ authenticated: false })
      if (signout) {
        toast.success("Sign out successful")
      }
    } catch (error) {
      toast.error(error.message);

    }
  }
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start max-w-[38vw]">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to='/'>Home</Link></li>
            <li>
              <span>Users</span>
              <ul className="p-2">
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to='/register'>Sign Up</Link></li>
                <li><Link to='/create-block'>Create Block</Link></li>
                <li><Link to='/blocks'>Blocks</Link></li>
              </ul>
            </li>
            <li><a href='https://bimtrazer.com/' target='_blank' rel='noopener noreferrer'>Contact Us</a></li>
            <li onClick={handleSignout}><Link to='/'>Sign Out</Link></li>
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl bg-slate-500">
          <img src="./vite.png" alt="" width='25px' />
          &#385;im&#385;loX
        </Link>
      </div>
      <div className="navbar-cente hidden sm:flex">
        <ul className="menu menu-horizontal px-1">
          <li className='mx-3'><Link to='/'>Home</Link></li>
          <li className='mx-3 dropdown dropdown-hover'>
            <span tabIndex={0} className="cursor-pointer">Users</span>
            <ul className="menu dropdown-content bg-base-100 rounded-box mt-3 p-2 shadow min-w-24">
              <li className='min-w-24'><Link to="/signin">Sign In</Link></li>
              <li className='min-w-24'><Link to='/register'>Sign Up</Link></li>
              <li className='min-w-24'><Link to='/create-block'>Create Block</Link></li>
              <li className='min-w-24'><Link to='/blocks'>Blocks</Link></li>
            </ul>
          </li>
          <li className='mx-3'><a href='https://bimtrazer.com/' target='_blank' rel='noopener noreferrer'>Contact Us</a></li>
          <li className='min-w-24' onClick={handleSignout}><Link to='/'>Sign Out</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
