import api from "../../../app/api";

export const loginUser = async (loginData) => {
  const response = await api.post("/v1/auth/login", loginData);

  return response.data;
};

export const sendOtp = async (email) => {
  const response = await api.post("/v1/auth/forgotPassword/sendOtp", {
    email,
  });

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await api.post("/v1/auth/forgotPassword/verifyOtp", {
    email,
    otp,
  });
  return response.data;
};

export const resetPassword = async (email, newPassword) => {
  const response = await api.post("/v1/auth/forgotPassword/resetPassword", {
    email,
    newPassword,
  });
  return response.data;
};
