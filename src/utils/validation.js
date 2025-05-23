const validator = require('validator');

const validateTheSignUpData = (req) => {
  const { firstName, email, password } = req;
  const errors = [];

  if (!firstName || firstName.length < 4 || firstName.length > 50) {
    errors.push("First name length should be between 4 and 50 characters.");
  }

  if (!email || !validator.isEmail(email)) {
    errors.push("Please enter a valid email.");
  }

  if (!password || !validator.isStrongPassword(password)) {
    errors.push("Please enter a strong password (min 8 characters, including uppercase, lowercase, number, and symbol).");
  }

  if (errors.length > 0) {
    // You can throw an error object or return the array depending on your use case
    throw new Error(errors.join(" "));
    // Or: return { isValid: false, errors };
  }

  // Optionally return success state
  return { isValid: true };
};

module.exports = { validateTheSignUpData };
