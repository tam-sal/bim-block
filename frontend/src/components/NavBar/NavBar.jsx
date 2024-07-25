import React from 'react'
import { Link } from 'react-router-dom'
function NavBar() {

  return (
    <div className="navbar bg-base-100 absolute top-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Link to='/'>
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
              </svg></Link>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to='/'>Home</Link></li>
            <li>
              <a>User</a>
              <ul className="p-2">
                <li>
                  <Link to="/signin">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to='/register'>Sign Up</Link>
                </li>
              </ul>
            </li>
            <li><a href='https://bimtrazer.com/' target='_blank'>Contact Us</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl bg-slate-500">
          <img src="./vite.png" alt="" width='25px' />
          &#385;im&#385;loX
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className='mx-3'><Link to='/'>Home</Link></li>
          <li className='mx-3'>
            <details className='w-20'>
              <summary>Users</summary>
              <ul className="p-2">
                <li className='w-20'><Link to="/signin">
                  Sign In
                </Link></li>
                <li className='w-20'><Link to='/register'>Sign Up</Link></li>
              </ul>
            </details>
          </li>
          <li className='mx-3'><a href='https://bimtrazer.com/' target='_blank'>Contact Us</a></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar