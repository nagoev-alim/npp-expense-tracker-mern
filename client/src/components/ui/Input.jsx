// 📦 Component - Input
const Input = ({ children, register, name, ...rest }) => (
  <>
    {children}
    <input {...rest} {...register(name)} />
  </>
);

export default Input;
