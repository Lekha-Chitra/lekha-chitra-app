import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import {validateEmail} from "../../../utils/validation";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }
    setError("");
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
          type="text"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
            error={error}
        />
        {error && (
          <p className="text-red-400 text-sm mt-1">{error}</p>
        )}
        
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
