import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../../utils/validation";
import { loginUser } from "../services/authService";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      setLoading(true);
      setApiError("");

      const response = await loginUser(formData);

      console.log("Login Success");
      console.log(response);

      if (response.isSuccess) {
        navigate("/dashboard", { replace: true });
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        setApiError("Invalid email or password.");
      } else {
        setApiError(
          error.response?.data?.message ||
            error.response?.data?.title ||
            "Login failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 md:space-y-8 w-full flex flex-col items-center"
    >
      <div className="flex flex-col gap-6">
        {/* Email */}

        <div>
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {errors.email && (
            <p className="text-red-400 text-sm mt-1 ">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            }
          />

          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* API Error Message */}
        {apiError && (
          <div className="w-full max-w-sm rounded-md border border-red-500 bg-red-100 px-4 py-3 text-sm text-red-700">
            {apiError}
          </div>
        )}

        {/* Login + Forgot Password */}
        <div
          className="
          w-full
          sm:w-[90%]
          md:w-[100%]
          xl:w-[100%]
          2xl:w-[350px]
          flex flex-col sm:flex-row
          gap-6
          sm:justify-between
          sm:items-center
          
        "
        >
          <Button
            type="submit"
            disabled={loading}
            className="
            bg-[#E59C11]
            text-white
            cursor-pointer
            w-full sm:w-[140px] md:w-[170px]
            h-[45px] sm:h-[50px] md:h-[55px]
            rounded-full
            text-lg sm:text-xl md:text-2xl
            pb-2.5
            disabled:opacity-50
          "
          >
            {loading ? "Logging In..." : "Login"}
          </Button>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="
            text-white
            cursor-pointer
            text-sm sm:text-base md:text-lg
            
        

          "
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
