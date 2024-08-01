const regex = {
  email: /^(?=.{5,20}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  emailErr: 'Email: min: 10 - max: 20 - no three consecutive identical characters',
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*(.)\1{2})[A-Za-z\d@$!%*?&]{8,20}$/,
  passwordErr: 'Password: min: 8 - max: 20 - 1 uppercase - 1 Special character - no three consecutive identical characters'
};

const validateEmailFormat = (email) => {
  return regex.email.test(email)

};

const validatePasswordFormat = (password) => {
  return regex.password.test(password)
};

const isPasswordMatched = (password, confirmedPassword) => {
  return password === confirmedPassword;
};


export { validateEmailFormat, validatePasswordFormat, isPasswordMatched };