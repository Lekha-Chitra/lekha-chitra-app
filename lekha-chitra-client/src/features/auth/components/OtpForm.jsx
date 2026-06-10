import { useRef, useState } from "react";
import Button from "../../../components/common/Button";
import { validateOtp } from "../../../utils/validation";
function OtpForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error,setError] = useState("");

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //clear error while typing
    setError("")

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    const otpError = validateOtp(otpValue);
    if(otpError){
      setError(otpError);
      return;
    }
    setError("");

    console.log("OTP:", otpValue);
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* OTP Boxes */}
      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="
              w-12
              h-12
              md:w-14
              md:h-14
              xl:w-16
              xl:h-16
              bg-white
              rounded-lg
              text-center
              text-xl
              md:text-2xl
              font-semibold
              outline-none
            "
          />
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}

      <Button
        type="submit"
        className="
          w-full
          bg-[#E59C11]
          text-white
          h-[55px]
          rounded-full
          text-xl
          cursor-pointer
        "
      >
        Verify OTP
      </Button>
    </form>
  );
}

export default OtpForm;
