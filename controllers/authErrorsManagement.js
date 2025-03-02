// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "email o password errata";
  }

  // incorrect password signup
  if (err.message === "Validation is on password failed") {
    errors.password =
      "Minimo otto caratteri e massimo venticinque caratteri, almeno una lettera maiuscola, una lettera minuscola, un numero ed un carattere speciale";
  }

    // incorrect password signin
    if (err.message === "incorrect password") {
      errors.password =
        "password o email errata";
    }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("Validation error")) {
    //console.log(err.errors);
    //console.log(err.errors[0].message);
    Object.values(err.errors).forEach((elem) => {
      console.log(elem.message);
      switch (elem.message) {
        case "users_email must be unique":
          errors.email += "That email is already registered";
          break;
        case "Validation isEmail on email failed":
          errors.email += "Email input is not en email";
          break;
      }
    });
  }

  return errors;
};
module.exports = { handleErrors };
