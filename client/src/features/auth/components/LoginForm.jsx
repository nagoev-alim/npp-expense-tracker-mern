import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import { authSelect, authStateReset, loginUser } from '../authSlice.js';
import { loginSchema } from '../../../utils/validateSchema.js';
import { ErrorMessage, Input, Loader } from '../../../components/index.js';


// 📦 Component - Login Form
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(authSelect.all);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
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
      dispatch(loginUser(data));
      reset();
    })}
  >
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
    <label className='form-group'>
      <Input
        className='input'
        type='password'
        name='password'
        placeholder='Enter your password'
        register={register}
      >
        <span className='form-group-label'>Enter your password</span>
      </Input>
      <ErrorMessage errors={errors} field='password' />
    </label>
    {/*  */}
    <button className='btn btn-primary' type='submit' disabled={!isValid}>Login</button>
  </form>;
};

export default LoginForm;
