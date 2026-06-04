import { useState } from "react";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

    setFormData({
      username: "",
      password: "",
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit}
    className="space-y-5 md:space-y-8 pl-8 sm:pl-10 md:pl-14"
    >
      <Input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <div className="relative">
        <Input
          //   type="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            text-gray-500
            cursor-pointer
          "
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
        {/* <FaEye /> */}
      </div>

      <div
        className="flex
    flex-col
    sm:flex-row
    gap-4
    sm:justify-between
    sm:items-center"
      >
        <Button
          type="submit"
          // onClick={() => setShowPassword(!showPassword)}
          className="
            bg-[#E59C11]
            text-white
            
            
            cursor-pointer
            w-full
sm:w-[140px]
md:w-[170px]
            
h-[45px]
sm:h-[50px]
md:h-[55px]
            rounded-full
         text-lg
sm:text-xl
md:text-2xl
            pb-2.5
          "
        >
          Login
        </Button>

        <button
          type="button"
          className="
            
            text-white
            cursor-pointer
            text-sm
            sm:text-base
            md:text-lg
          "
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
