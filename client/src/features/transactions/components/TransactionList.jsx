import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AiFillDelete, BiEditAlt, FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/all.js';
import { motion, AnimatePresence } from 'framer-motion';

import { deleteTransaction, setEditStatus } from '../transactionsSlice.js';
import { formatter } from '../../../utils/priceFormatter.js';

// 📦 Component - Transaction List
const TransactionList = ({ transactions }) => (
  <AnimatePresence>
    <ul className='grid gap-2.5'>
      {transactions.map(transaction =>
        <motion.div
          key={transaction._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
        >
          <TransactionItem transaction={transaction} />
        </motion.div>)}
    </ul>
  </AnimatePresence>
);

export default TransactionList;

// 📦 Component - Transaction Item
const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const price = transaction.price.toString()
  const transactionType = price.includes('-');
  const date = new Date(transaction.date).toLocaleString('en-US').replaceAll('/', '-');

  const onDelete = () => {
    dispatch(deleteTransaction(transaction._id));
    toast.success(`Transaction ${transaction.text} deleted`);
  };

  const onEdit = () => {
    dispatch(setEditStatus({
      isEditable: true,
      item: transaction,
    }));
  };

  return <li
    className={`relative border rounded-md p-2 ${transactionType ? 'bg-red-50/10 border-red-200' : 'bg-green-50/10 border-green-200'} md:grid md:gap-2.5 md:grid-cols-[auto_auto_50px]`}>
    <div className='grid gap-2 md:grid-cols-[30px_1fr] md:items-center'>
      {/* Icon */}
      {transactionType ? <FaArrowAltCircleDown className='text-red-600' /> : <FaArrowAltCircleUp className='text-green-600' />}
      {/* Info */}
      <div className='md:grid'>
        <p className='font-bold'>{transaction.title}</p>
        <p className='text-sm font-bold text-neutral-500'>{date}</p>
      </div>
    </div>
    {/* Price */}
    <span className={`break-all font-bold text-lg ${transactionType ? 'text-red-500' : 'text-green-500'} md:self-center md:justify-self-end`}>
      {transactionType ? `-${formatter.format(price.substring(1))}` : `+${formatter.format(transaction.price)}`}
    </span>

    {/* Buttons */}
   <div className='absolute flex items-center gap-2 right-2 top-2 md:static'>
     <button className='text-neutral-500 font-bold' onClick={onEdit}>
       <BiEditAlt size={20} />
     </button>
     <button className='text-red-500 font-bold' onClick={onDelete}>
       <AiFillDelete size={20} />
     </button>
   </div>
  </li>;
};
