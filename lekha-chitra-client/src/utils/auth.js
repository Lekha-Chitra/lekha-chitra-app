export const logout = () => {
  sessionStorage.removeItem("isLoggedIn");

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("refreshToken");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
