import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-5"
    >
      <div className="w-full items-center flex flex-col">
        <Input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

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
        Send OTP
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
