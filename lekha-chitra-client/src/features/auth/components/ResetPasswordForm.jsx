import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    setFormData({ password: "", confirmPassword: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
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

      <Input
        type={showPassword ? "text" : "password"}
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
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

      <Button
        type="submit"
        className="
          w-full
          sm:w-[90%]
          md:w-[80%]
          xl:w-[70%]
          2xl:w-[350px]
          bg-[#E59C11]
          text-white
          h-[55px]
          rounded-full
          text-xl
          cursor-pointer
        "
      >
        Reset Password
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
