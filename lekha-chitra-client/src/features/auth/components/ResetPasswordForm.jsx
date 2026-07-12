import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";
import { resetPassword } from "../services/authService";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
function ResetPasswordForm() {
  // console.log("email from state", email)
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");

    if (!storedEmail) {
      navigate("/forgot-password", { replace: true });
      return;
    }

    if (storedEmail !== email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    );

    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    try {
      setLoading(true);
      setErrors({ password: "", confirmPassword: "" });
      setApiError("");

      const response = await resetPassword(email, formData.password);

      console.log("Reset Password:", response);

      if (response.isSuccess) {
        sessionStorage.removeItem("resetEmail");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Reset Password Error:", err);

      setApiError(
        err.response?.data?.message ||
          err.response?.data?.title ||
          "Failed to reset password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col  items-center gap-4 sm:gap-5"
    >
      <div className="w-full">
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
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          }
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div className="w-full">
        <Input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          }
        />
        {errors.confirmPassword && (
          <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* {apiError && <p className="text-red-400 text-sm mt-1">{apiError}</p>} */}
      <div className="min-h-[24px] flex items-center justify-center">
        {apiError && (
          <p className="text-red-400 text-xs md:text-sm text-center">
            {apiError}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="
w-full

h-10
sm:h-11
md:h-12

bg-[#E59C11]
text-white

rounded-full

text-sm
sm:text-base
md:text-lg

cursor-pointer

disabled:opacity-50
"
      >
        {/* {loading ? "Resetting..." : "Reset Password"}
         */}
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner size={18} />
           
          </div>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
