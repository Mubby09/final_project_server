module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Please insert a username";
  }
  if (email.trim() === "") {
    errors.username = "Email cannnot be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Please type in a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password cannot be empty";
  } else if (password != confirmPassword) {
    errors.confirmPassword = "Passswords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Please input a username";
  }
  if (password.trim() === "") {
    errors.password = "Please input your password";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
