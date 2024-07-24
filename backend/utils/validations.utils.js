const regex = {
  email: /^(?=.{10,20}$)(?!.*([a-zA-Z0-9])\1{2})([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
  emailErr: 'Email: min: 10 - max: 20 - no three consecutive identical characters',
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*(.)\1{2})[A-Za-z\d@$!%*?&]{8,20}$/,
  passwordErr: 'Password: min: 8 - max: 20 - 1 uppercase - 1 Special character - no three consecutive identical characters'
};

const validateEmailFormat = (email) => {
  if (!regex.email.test(email)) {
    return {
      isValid: false,
      message: regex.emailErr
    };
  }
  return { isValid: true };
};

const validatePasswordFormat = (password) => {
  if (!regex.password.test(password)) {
    return {
      isValid: false,
      message: regex.passwordErr
    };
  }
  return { isValid: true };
};

const isPasswordMatched = (password, confirmedPassword) => {
  if (password !== confirmedPassword) {
    return {
      isValid: false,
      message: 'Password mismatch'
    };
  }
  return { isValid: true };
};


export { validateEmailFormat, validatePasswordFormat, isPasswordMatched };

