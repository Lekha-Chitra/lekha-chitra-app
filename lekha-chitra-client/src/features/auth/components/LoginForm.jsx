import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ username: "", password: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 md:space-y-8 w-full flex flex-col items-center  "
    >
      {/* Username */}
      <Input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />

      {/* Password */}
      <Input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
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

      {/* Login + Forgot Password */}
      <div
        className="
        w-full
        sm:w-[90%]
        md:w-[80%]
        xl:w-[70%]
        2xl:w-[350px]
        flex flex-col sm:flex-row
        gap-4
        sm:justify-between
        sm:items-center
      "
      >
        <Button
          type="submit"
          className="
            bg-[#E59C11]
            text-white
            cursor-pointer
            w-full sm:w-[140px] md:w-[170px]
            h-[45px] sm:h-[50px] md:h-[55px]
            rounded-full
            text-lg sm:text-xl md:text-2xl
            pb-2.5
          "
        >
          Login
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
    </form>
  );
}

export default LoginForm;

// sm:w-[90%]
// md:w-[80%]
// xl:w-[90%]
// 2xl:w-[450px]
