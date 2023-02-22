import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { createTransaction, transactionsSelect, setEditStatus, updateTransaction } from '../transactionsSlice.js';
import { transactionSchema } from '../../../utils/validateSchema.js';

import { ErrorMessage, Input } from '../../../components/index.js';


// 📦 Component - Transaction Form
const TransactionForm = () => {
  const dispatch = useDispatch();
  const { editStatus } = useSelector(transactionsSelect.all);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit, formState: { errors, isValid }, reset, setValue } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      title: '',
      price: '',
    },
  });

  useEffect(() => {
    if (editStatus.isEditable) {
      setValue('title', editStatus.item.title);
      setValue('price', editStatus.item.price);
      setStartDate(new Date(editStatus.item.date));
    }
  }, [editStatus]);

  const onSubmit = (data) => {
    if (editStatus.isEditable) {
      const payload = {
        item: {
          title: data.title,
          price: data.price,
          date: startDate,
        },
        id: editStatus.item._id,
      };
      dispatch(updateTransaction(payload));
      dispatch(setEditStatus({
        isEditable: false,
        item: null,
      }));
    } else {
      dispatch(createTransaction({ ...data, date: startDate }));
    }
    toast.success(`Transaction was successfully ${editStatus.isEditable ? 'updated' : 'created'}`);
    reset();
  };

  // 📦 Rendering
  return <form className='grid gap-2 w-full m-auto sm:gap-3' onSubmit={handleSubmit(onSubmit)}>
    {/* Name */}
    <label className='form-group'>
      <Input
        className='input'
        type='text'
        name='title'
        placeholder='For example, Rent account'
        register={register}
      >
        <span className='form-group-label inline-flex items-center'>Enter name <sup
          className='text-red-500'>*</sup></span>
      </Input>
      <ErrorMessage errors={errors} field='title' />
    </label>

    {/* Price */}
    <label className='form-group'>
      <Input
        className='input'
        type='number'
        name='price'
        placeholder='Enter price'
        register={register}
      >
        <span
          className='form-group-label inline-flex items-center'>Enter price (negative - expense, positive - income) <sup
          className='text-red-500'>*</sup></span>
      </Input>
      <ErrorMessage errors={errors} field='price' />
    </label>

    {/* Date */}
    <label className='form-group'>
      <span className='form-group-label'>Enter date</span>
      <DatePicker
        className='input w-full'
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeInputLabel='Time:'
        dateFormat='MM-dd-yyyy h:mm aa'
        showTimeInput
      />
    </label>

    {/* Buttons */}
    <button
      className={`btn btn-primary ${editStatus.isEditable ? 'bg-green-500' : ''} `}
      type='submit'
      disabled={!isValid}
    >
      {editStatus.isEditable ? 'Update' : 'Add'} Transaction
    </button>
    {editStatus.isEditable &&
      <button
        className='btn text-white bg-red-500 border-red-400 hover:text-white'
        type='button'
        onClick={() => {
          dispatch(setEditStatus({
            isEditable: false,
            item: null,
          }));
          reset();
        }}
      >Cancel Edit</button>
    }
  </form>;
};

export default TransactionForm;
