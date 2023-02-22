import { FaAngleDown, FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { transactionsSelect } from '../transactionsSlice.js';
import { formatter } from '../../../utils/priceFormatter.js';

// 📦 Component - Overview
const Overview = () => {
  const {total ,expense, income} = useSelector(transactionsSelect.all);

  // 📦 Rendering
  return <div className='grid gap-3 border rounded-md p-2 md:p-3'>
    <h2 className='inline-flex items-center font-bold md:text-xl'>Total Balance <FaAngleDown className='mt-0.5' />
    </h2>

    <p className='font-bold text-xl lg:text-3xl'>{formatter.format(total)}</p>

    <div className='grid gap-2 md:grid-cols-2'>
      <div className='grid gap-1 place-content-baseline p-2 border border-green-200 rounded-md bg-green-50'>
        <p className='inline-flex gap-1 items-center font-bold'>
          <FaArrowAltCircleUp className='text-green-600' />
          Income
        </p>
        <p className='font-semibold break-all'>{formatter.format(income)}</p>
      </div>

      <div className='grid gap-1 place-content-baseline p-2 border border-red-200 rounded-md bg-red-50'>
        <p className='inline-flex gap-1 items-center font-bold'>
          <FaArrowAltCircleDown className='text-red-600' />
          Expenses
        </p>
        <p className='font-semibold break-all'>{formatter.format(expense)}</p>
      </div>
    </div>
  </div>;
};

export default Overview;
