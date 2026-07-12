import Branding from "../components/Branding";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import bgImage from "../../../assets/images/login-banner.jpg";
import "../../../authResponsive.css";
function ForgotPassword() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Image */}
      <div className="hidden lg:block w-1/2">
        <img
          src={bgImage}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-[#032A4E] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="
            w-full
            max-w-[460px]
            h-full
            flex
            flex-col
            justify-center
            items-center
            gap-3
            sm:gap-5
            md:gap-7
            py-4
          "
        >
          {/* Logo */}
          <Branding />

          {/* Heading */}
          <div className="text-center">
            <h2
              className="
                text-white
                font-bold
                text-2xl
                sm:text-3xl
                md:text-4xl
              "
            >
              Forget your password?
            </h2>

            <p
              className="
                text-white
                mt-3
                text-xs
                sm:text-sm
                md:text-base
                leading-relaxed
              "
            >
              Enter your registered email address and we'll send a verification
              code (OTP) to reset your password.
            </p>
          </div>

          {/* Form */}
          <div className="w-full">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
