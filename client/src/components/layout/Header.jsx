import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaAtom, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { authSelect, authStateReset, logoutUser } from '../../features/auth/authSlice.js';

// 📦 Component - Header
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authSelect.all);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(authStateReset());
    navigate('/login');
  };

  // 📦 Rendering
  return <header
    className='grid gap-2 justify-items-center p-4 border border-b-[#e6e6e6] sm:flex sm:items-center sm:justify-between'>
    {/* Logo */}
    <Link className='flex items-center font-bold text-lg' to='/'>
      Expense <FaAtom /> Tracker
    </Link>
    {/* Menu */}
    <ul className='flex gap-2'>
      {user ? (
        <li>
          <button className='btn btn-primary' onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      ) : (
        <>
          <li>
            <Link className='btn' to='/login'>
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link className='btn btn-primary' to='/register'>
              <FaUser /> Register
            </Link>
          </li>
        </>
      )}
    </ul>
  </header>;
};

export default Header;
