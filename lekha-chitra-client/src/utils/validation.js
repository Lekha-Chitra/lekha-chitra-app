// Email Validation
export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  return "";
};

// Username Validation
export const validateUsername = (username) => {
  if (!username.trim()) {
    return "Username is required";
  }

  return "";
};

// Password Validation
export const validatePassword = (password) => {
  if (!password.trim()) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain one uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain one lowercase letter";
  }

  if (!/\d/.test(password)) {
    return "Password must contain one number";
  }

  if (!/[\W_]/.test(password)) {
    return "Password must contain one special character";
  }

  return "";
};

// Confirm Password Validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword.trim()) {
    return "Confirm password is required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};

// OTP Validation
export const validateOtp = (otp) => {
  const otpValue = Array.isArray(otp) ? otp.join("") : otp;

  if (!otpValue.trim()) {
    return "OTP is required";
  }

  if (otpValue.length !== 6) {
    return "OTP must be 6 digits";
  }

  if (!/^\d+$/.test(otpValue)) {
    return "OTP must contain only numbers";
  }

  return "";
};
