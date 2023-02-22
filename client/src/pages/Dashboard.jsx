import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { authSelect } from '../features/auth/authSlice.js';
import {
  getTransactions,
  resetTransactionState,
  transactionsSelect,
} from '../features/transactions/transactionsSlice.js';

import { TransactionForm, TransactionList } from '../features/transactions/components/index.js';
import Overview from '../features/transactions/components/Overview.jsx';

// 📦 Component - Dashboard
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(authSelect.all);
  const transactions = useSelector(transactionsSelect.all);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (transactions.error) {
        toast.error(transactions.message);
      }
      dispatch(getTransactions());
      return () => {
        dispatch(resetTransactionState());
      };
    }
  }, [transactions.error, transactions.message, navigate, dispatch]);


  // 📦 Rendering
  return <div className='grid gap-4 p-3 max-w-xl m-auto sm:py-10'>

    {/* Header */}
    <div className='grid gap-1 justify-items-center sm:gap-2'>
      <h1 className='font-bold text-lg flex flex-wrap items-center gap-1 sm:text-xl md:text-2xl md:gap-2'>
        👋 Welcome {user && user.name}
      </h1>
      <p className='text-neutral-500 md:font-bold md:text-xl'>Transactions Dashboard</p>
    </div>

    {/* Overview */}
    <Overview/>

    {/* Form */}
    <div className='border'/>
    <p className='text-lg text-neutral-600 font-bold md:text-xl'>Add Transaction</p>
    <TransactionForm />

    {/* Transactions */}
    <div className='border'/>
    {transactions.items.length > 0
      ? <>
        <p className='text-lg text-neutral-600 font-bold md:text-xl'>Transactions History</p>
        <TransactionList transactions={transactions.items} />
      </>
      : <h3 className='text-center font-semibold'>🥲 You have not set any transactions</h3>
    }
  </div>;
};

export default Dashboard;
