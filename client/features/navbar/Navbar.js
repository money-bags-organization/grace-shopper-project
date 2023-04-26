import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };
  //*Malcolm was Here
  const isLoggedAdmin = useSelector(state => state.auth.me.isAdmin);

  //End Malcolm edit

  return (
    <div className='navbar'>
      <h1 className='margin-zero'>RETROLAND</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/home'>Home</Link>
            <button type='button' onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <Link to='/public/products'>All Products</Link>
            <Link to='/cart'>Cart</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/public/products'>All Products</Link>
          </div>
        )}
        {isLoggedAdmin ? (
          <div>
            <Link to='/products'>Admin-AllProducts</Link>
            {/* The navbar will show these links after you log in */}
          </div>
        ) : (
          <div>{/* The navbar will show these links before you log in */}</div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
