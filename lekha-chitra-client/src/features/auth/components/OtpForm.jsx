// import { useRef, useState } from "react";
// import Button from "../../../components/common/Button";
// import { validateOtp } from "../../../utils/validation";
// function OtpForm() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [error,setError] = useState("");

//   const inputsRef = useRef([]);

//   const handleChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     //clear error while typing
//     setError("")

//     if (value && index < 5) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const otpValue = otp.join("");

//     const otpError = validateOtp(otpValue);
//     if(otpError){
//       setError(otpError);
//       return;
//     }
//     setError("");

//     console.log("OTP:", otpValue);
//     setOtp(["", "", "", "", "", ""]);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-8">
//       {/* OTP Boxes */}
//       <div className="flex justify-center gap-3">
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             ref={(el) => (inputsRef.current[index] = el)}
//             type="text"
//             maxLength={1}
//             value={digit}
//             onChange={(e) => handleChange(e.target.value, index)}
//             onKeyDown={(e) => handleKeyDown(e, index)}
//             className="
//               w-12
//               h-12
//               md:w-14
//               md:h-14
//               xl:w-16
//               xl:h-16
//               bg-white
//               rounded-lg
//               text-center
//               text-xl
//               md:text-2xl
//               font-semibold
//               outline-none
//             "
//           />
//         ))}
//       </div>

//       {error && (
//         <p className="text-red-400 text-sm mt-1">{error}</p>
//       )}

//       <Button
//         type="submit"
//         className="
//           w-full
//           bg-[#E59C11]
//           text-white
//           h-[55px]
//           rounded-full
//           text-xl
//           cursor-pointer
//         "
//       >
//         Verify OTP
//       </Button>
//     </form>
//   );
// }

// export default OtpForm;

import { useRef, useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { validateOtp } from "../../../utils/validation";
import { verifyOtp } from "../services/authService";

function OtpForm() {
  

   

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/", { replace: true });
  //   }
  // }, [email, navigate]);

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
        setApiError("Too many invalid attempts. Redirecting to request a new otp...");

        setTimeout(() => {
          navigate("/forgot-password", {
            replace: true,
          });
        }, 2000);

        return;
      }

      setApiError(message);
    } finally {
      // } catch (err) {
      //   console.error("Verify OTP Error:", err);

      //   setApiError(
      //     err.response?.data?.message ||
      //       err.response?.data?.title ||
      //       "OTP verification failed.",
      //   );
      //    if (status === 401) {
      // setApiError(message);

      // setTimeout(() => {
      //   navigate("/forgot-password", {
      //     replace: true,
      //   });
      // }, 2000);
      // }

      setLoading(false);
    }
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

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      {apiError && (
        <p className="text-red-400 text-sm text-center">{apiError}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-[#E59C11]
          text-white
          h-[55px]
          rounded-full
          text-xl
          cursor-pointer
          disabled:opacity-50
        "
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
}

export default OtpForm;