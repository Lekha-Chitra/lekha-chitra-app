import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { validateEmail } from "../../../utils/validation";
import { sendOtp } from "../services/authService";
import { useNavigate } from "react-router-dom";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setApiError("");
      setSuccessMessage("");

      const response = await sendOtp(email);

      console.log("OTP Sent:", response);

      setSuccessMessage(response.message || "OTP sent successfully.");
      if (response.isSuccess) {
        sessionStorage.setItem("otpEmail", email);
        navigate("/verify-otp", {
          state: {
            email,
          },
          replace: true,
        });
      }

      // setEmail("");
    } catch (error) {
      console.error("Send OTP Error:", error);

      setApiError(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to send OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-5"
    >
      <div
        className="w-full 
          sm:w-[90%]
          md:w-[70%]
          xl:w-[60%]
          2xl:w-[350px]
          flex flex-col items-center
          "
      >
        <Input
          type="text"
          placeholder="Enter Email Address"
          value={email}
          className=""
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
            setApiError("");
            setSuccessMessage("");
          }}
          error={error}
        />

        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

        {apiError && <p className="text-red-400 text-sm mt-1">{apiError}</p>}

        {successMessage && (
          <p className="text-green-400 text-sm mt-1">{successMessage}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="
          w-full
          sm:w-[90%]
          md:w-[80%]
          xl:w-[70%]
          2xl:w-[350px]
          bg-[#E59C11]
          text-white
          h-[55px]
          rounded-2xl
          text-xl
          cursor-pointer
          disabled:opacity-50
        "
      >
        {loading ? "Sending..." : "Send OTP"}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
