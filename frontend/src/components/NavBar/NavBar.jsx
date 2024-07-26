import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
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
              </ul>
            </li>
            <li><a href='https://bimtrazer.com/' target='_blank' rel='noopener noreferrer'>Contact Us</a></li>
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl bg-slate-500">
          <img src="./vite.png" alt="" width='25px' />
          &#385;im&#385;loX
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
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
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
