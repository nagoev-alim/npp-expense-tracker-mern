import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GrFormViewHide, GrHide } from 'react-icons/gr';

import { authSelect, authStateReset, registerUser } from '../authSlice.js';
import { registerSchema } from '../../../utils/validateSchema.js';

import { ErrorMessage, Input, Loader } from '../../../components/index.js';


// 📦 Component - Register Form
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(authSelect.all);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.message);
    }

    if (auth.status === 'success' || auth.user) {
      navigate('/');
      dispatch(authStateReset());
    }

  }, [auth, navigate, dispatch]);

  // 📦 Rendering
  if (auth.status === 'loading') return <Loader />;

  return <form
    className='grid gap-2 max-w-lg w-full m-auto sm:gap-3'
    onSubmit={handleSubmit((data) => {
      dispatch(registerUser(data));
      reset();
    })}
  >
    {/*  */}
    <label className='form-group'>
      <Input
        className='input'
        type='text'
        name='name'
        placeholder='Enter your name'
        register={register}
      >
        <span className='form-group-label'>Enter your name</span>
      </Input>
      <ErrorMessage errors={errors} field='name' />
    </label>
    {/*  */}
    <label className='form-group'>
      <Input
        className='input'
        type='email'
        name='email'
        placeholder='Enter your email'
        register={register}
      >
        <span className='form-group-label'>Enter your email</span>
      </Input>
      <ErrorMessage errors={errors} field='email' />
    </label>
    {/*  */}
    <label className='form-group relative'>
      <Input
        className='input'
        type={showPassword ? 'text' : 'password'}
        name='password'
        placeholder='Enter your password'
        register={register}
      >
        <span className='form-group-label'>Enter your password</span>
        <button
          className='absolute right-2 top-[34px] z-10 sm:top-[35px]'
          type='button'
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? <GrHide size={25} className='pointer-events-none' /> :
            <GrFormViewHide size={25} className='pointer-events-none' />}
        </button>
      </Input>
      <ErrorMessage errors={errors} field='password' />
    </label>
    {/*  */}
    <label className='form-group'>
      <Input
        className='input'
        type='password'
        name='confirmPassword'
        placeholder='Confirm your password'
        register={register}
      >
        <span className='form-group-label'>Confirm your password</span>
      </Input>
      <ErrorMessage errors={errors} field='confirmPassword' />
    </label>
    {/*  */}
    <button className='btn btn-primary' type='submit' disabled={!isValid}>Register</button>
  </form>;
};

export default RegisterForm;
