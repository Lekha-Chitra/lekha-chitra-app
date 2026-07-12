
import Branding from "../components/Branding";
import OtpForm from "../components/OtpForm";
import bgImage from "../../../assets/images/login-banner.jpg";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Left Banner */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={bgImage}
          alt="Construction Site"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right Panel */}
      <div
        className="
          w-full
          lg:w-1/2
          min-h-screen

          bg-[#032A4E]

          flex
          items-center
          justify-center

          px-4
          sm:px-6
          py-4

          overflow-y-auto
        "
      >
        <div
          className="
            w-full
            max-w-md

            flex
            flex-col
            items-center

            gap-3
            sm:gap-4
            lg:gap-5

            py-2
          "
        >
          <Branding />

          <div className="w-full">
            <h2
              className="
                text-white
                text-center
                font-bold

                text-2xl
                sm:text-3xl
                md:text-4xl
              "
            >
              Verify OTP
            </h2>

            <p
              className="
                text-white
                text-center

                mt-2
                mb-5

                text-sm
                md:text-base
              "
            >
              Enter the 6-digit verification code sent to your email.
            </p>

            <OtpForm />
          </div>

          <p
            className="
              text-white
              text-center

              text-xs
              sm:text-sm
            "
          >
            Didn't receive the OTP?{" "}
            <button
              onClick={() => navigate("/forgot-password")}
              className="
                text-[#E59C11]
                underline
                cursor-pointer
              "
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;