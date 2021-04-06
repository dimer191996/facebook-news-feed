module.exports.validateRegisterInput = (
  username,
  email,
  password,
  comfirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "User name must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = " Password must not be empty";
  } else if (password !== comfirmPassword) {
    errors.comfirmPassword = "Password does not match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "User name must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateCommentInput = (body) => {
  const errors = {};

  if (body.trim() === "") {
    errors.comment = "Comment body must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateReplyInput = (body) => {
  const errors = {};

  if (body.trim() === "") {
    errors.reply = "Reply body must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validatePostFormInput = (body, title) => {
  const errors = {};

  if (body.trim() === "") {
    errors.body = "Body must not be empty";
  }
  if (title.trim() === "") {
    errors.title = "Title must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
