import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { validateOtp } from "../../../utils/validation";
import { verifyOtp } from "../services/authService";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
function OtpForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("otpEmail");

    // If no stored email in sessionStorage → page was refreshed or accessed directly
    if (!storedEmail) {
      navigate("/forgot-password", { replace: true });
      return;
    }

    // If email in state doesn't match stored → something is wrong
    if (storedEmail !== email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    setError("");
    setApiError("");

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    const otpError = validateOtp(otpValue);
    if (otpError) {
      setError(otpError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setApiError("");

      const response = await verifyOtp(email, otpValue);

      console.log("Verify OTP:", response);

      if (response.isSuccess) {
        sessionStorage.removeItem("otpEmail");
        sessionStorage.setItem("resetEmail", email);
        navigate("/reset-password", { state: { email }, replace: true });
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);

      const status = err.response?.status;
      const message =
        err.response?.data?.message ||
        err.response?.data?.title ||
        "OTP verification failed.";

      // OTP locked after max attempts
      if (status === 401) {
        setApiError(
          "Too many invalid attempts. Redirecting to request a new otp...",
        );

        setTimeout(() => {
          navigate("/forgot-password", {
            replace: true,
          });
        }, 2000);

        return;
      }

      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <form onSubmit={handleSubmit} className="flex flex-col gap-8">
  //     {/* OTP Boxes */}
  //     <div className="flex justify-center gap-3">
  //       {otp.map((digit, index) => (
  //         <input
  //           key={index}
  //           ref={(el) => (inputsRef.current[index] = el)}
  //           type="text"
  //           maxLength={1}
  //           value={digit}
  //           onChange={(e) => handleChange(e.target.value, index)}
  //           onKeyDown={(e) => handleKeyDown(e, index)}
  //           className="
  //             w-12
  //             h-12
  //             md:w-14
  //             md:h-14
  //             xl:w-16
  //             xl:h-16
  //             bg-white
  //             rounded-lg
  //             text-center
  //             text-xl
  //             md:text-2xl
  //             font-semibold
  //             outline-none
  //           "
  //         />
  //       ))}
  //     </div>

  //     {error && <p className="text-red-400 text-sm text-center">{error}</p>}
  //     {apiError && (
  //       <p className="text-red-400 text-sm text-center">{apiError}</p>
  //     )}

  //     <Button
  //       type="submit"
  //       disabled={loading}
  //       className="
  //         w-full
  //         bg-[#E59C11]
  //         text-white
  //         h-[55px]
  //         rounded-full
  //         text-xl
  //         cursor-pointer
  //         disabled:opacity-50
  //       "
  //     >
  //       {loading ? "Verifying..." : "Verify OTP"}
  //     </Button>
  //   </form>
  // );

  return (
    <form
      onSubmit={handleSubmit}
      className="
      w-full
      flex
      flex-col
      items-center

      gap-5
      md:gap-6
    "
    >
      {/* OTP Boxes */}
      <div
        className="
        flex
        justify-center
        gap-1.5
        sm:gap-2
        md:gap-3
      "
      >
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
            w-9
            h-9

            sm:w-10
            sm:h-10

            md:w-11
            md:h-11

            lg:w-12
            lg:h-12

            xl:w-14
            xl:h-14

            bg-white
            rounded-lg

            text-center

            text-sm
            sm:text-base
            md:text-lg

            font-semibold

            outline-none

            transition-all
            duration-200focus:ring-2
focus:ring-[#E59C11]
          "
          />
        ))}
      </div>

      {/* Error Messages */}
      <div className="min-h-[24px] flex items-center justify-center">
        {error && (
          <p className="text-red-400 text-xs md:text-sm text-center">{error}</p>
        )}

        {!error && apiError && (
          <p className="text-red-400 text-xs md:text-sm text-center">
            {apiError}
          </p>
        )}
      </div>

      {/* Verify Button */}
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
       
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner size={18} />
            
          </div>
        ) : (
          "Verify OTP"
        )}
      </Button>
    </form>
  );
}

export default OtpForm;
