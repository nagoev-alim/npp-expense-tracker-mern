import { FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { LoginForm } from '../features/auth/components/index.js';

// 📦 Component - Register
const Register = () => (
  <div className='grid gap-4 p-3 max-w-lg m-auto sm:py-10'>
    {/* Header */}
    <div className='grid gap-1 justify-items-center sm:gap-2'>
      <h1 className='font-bold text-lg flex flex-wrap items-center gap-1 sm:text-xl md:text-2xl md:gap-2'>
        <FaSignInAlt /> Login
      </h1>
      <p className='text-neutral-500 md:font-bold md:text-xl'>Login and start use tracker</p>
    </div>
    {/* Form */}
    <LoginForm />
    {/* Link */}
    <p className='text-center'>
      Don't have an account? {' '}
      <Link className='font-semibold underline transition-all hover:no-underline' to='/register'>Sign Up</Link>
    </p>
  </div>
);

export default Register;
