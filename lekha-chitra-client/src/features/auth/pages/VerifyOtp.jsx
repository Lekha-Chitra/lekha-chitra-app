import Branding from "../components/Branding";
import OtpForm from "../components/OtpForm";
import bgImage from "../../../assets/images/login-banner.jpg";

function VerifyOtp() {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Left Banner */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={bgImage}
          alt="Construction Site"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-[#032A4E] min-h-screen flex flex-col items-center px-8 py-10">
        <Branding />

        <div className="w-full max-w-[450px] mt-20">
          <h2 className="text-white text-center text-4xl font-bold mb-4">
            Verify OTP
          </h2>

          <p className="text-white text-center mb-8">
            Enter the 6-digit verification code sent to your email.
          </p>
          <div className="mt-20">
            <OtpForm />
          </div>
        </div>

        <p className="text-white mt-30 lg:mt-10 text-center">
          Didn't receive the OTP?{" "}
          <button className="text-[#E59C11] underline cursor-pointer">
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerifyOtp;
