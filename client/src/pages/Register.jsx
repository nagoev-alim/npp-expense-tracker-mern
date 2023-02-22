import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { RegisterForm } from '../features/auth/components/index.js';

// 📦 Component - Register
const Register = () => (
  <div className='grid gap-4 p-3 max-w-lg m-auto sm:py-10'>
    {/* Header */}
    <div className='grid gap-1 justify-items-center sm:gap-2'>
      <h1 className='font-bold text-lg flex flex-wrap items-center gap-1 sm:text-xl md:text-2xl md:gap-2'>
        <FaUser /> Register
      </h1>
      <p className='text-neutral-500 md:font-bold md:text-xl'>Please create an account</p>
    </div>
    {/* Form */}
    <RegisterForm />
    {/* Link */}
    <p className='text-center'>
      Already have account? {' '}
      <Link className='font-semibold underline transition-all hover:no-underline' to='/login'>Sign In</Link>
    </p>
  </div>
);

export default Register;
