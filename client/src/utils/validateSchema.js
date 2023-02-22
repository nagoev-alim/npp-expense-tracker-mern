import * as yup from 'yup';

const NAME_REGEX = {
  min: 3,
  max: 25,
  invalid: 'Email is invalid',
  required: 'Required',
  message: 'Only alphabets are allowed for this field',
  regex: /^[A-z\s]+$/,
};

const PASSWORD_REGEX = {
  min: 6,
  max: 25,
  required: 'Password is required',
  requiredConfirm: 'Confirm password is required',
  message: 'Only alphabets are allowed for this field',
  regex: /^[A-z\s]+$/,
  match: 'Password must match',
};

const EMAIL_REGEX = {
  invalid: 'Email is invalid',
  required: 'Email is required',
  message: 'Enter a valid email address ',
  regex: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
};

export const registerSchema = yup.object({
  name: yup.string()
    .min(NAME_REGEX.min, `Must be at least ${NAME_REGEX.min} characters`)
    .max(NAME_REGEX.max, `Must be ${NAME_REGEX.max} characters or less`)
    .matches(NAME_REGEX.regex, NAME_REGEX.message)
    .required(NAME_REGEX.required),
  email: yup.string()
    .email(EMAIL_REGEX.invalid)
    .matches(EMAIL_REGEX.regex, EMAIL_REGEX.message)
    .required(EMAIL_REGEX.required),
  password: yup.string()
    .min(PASSWORD_REGEX.min, `Must be at least ${PASSWORD_REGEX.min} characters`)
    .max(PASSWORD_REGEX.max, `Must be ${PASSWORD_REGEX.max} characters or less`)
    .required(PASSWORD_REGEX.required),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], PASSWORD_REGEX.match)
    .required(PASSWORD_REGEX.requiredConfirm),
});

export const loginSchema = yup.object({
  email: yup.string()
    .email(EMAIL_REGEX.invalid)
    .matches(EMAIL_REGEX.regex, EMAIL_REGEX.message)
    .required(EMAIL_REGEX.required),
  password: yup.string()
    .min(PASSWORD_REGEX.min, `Must be at least ${PASSWORD_REGEX.min} characters`)
    .max(PASSWORD_REGEX.max, `Must be ${PASSWORD_REGEX.max} characters or less`)
    .required(PASSWORD_REGEX.required),
});

const TRANSACTION_REGEX = {
  required: 'Required',
  title: {
    min: 3,
    message: 'Must be at least 3 characters',
  },
};

export const transactionSchema = yup.object({
  title: yup.string()
    .min(TRANSACTION_REGEX.title.min,TRANSACTION_REGEX.title.message)
    .required(TRANSACTION_REGEX.required),
  price: yup.string()
    .required(TRANSACTION_REGEX.required),
});
