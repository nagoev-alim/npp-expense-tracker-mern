// 📦 Error Messages
const ErrorMessages = ({ errors, field }) => (
  <>
    {errors?.[field] ? <span className='font-semibold text-xs text-red-500'>{errors?.[field]?.message}</span> : null}
  </>
);

export default ErrorMessages;
