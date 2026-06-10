import Branding from "../components/Branding";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import bgImage from "../../../assets/images/login-banner.jpg";

function ForgotPassword() {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={bgImage}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 bg-[#032A4E] min-h-screen flex flex-col items-center px-6 py-10">
        <Branding />

        <div className="w-full max-w-[450px] mt-20 lg:mt-25  flex flex-col items-center  ">
          <h2 className="text-white text-center text-4xl font-bold mb-10  ">
            Forget your password?
          </h2>

          <p className="text-white text-center mb-10">
            Enter your registered email address and we'll send a verification
            code (OTP) to reset your password.
          </p>
          <div className="w-full max-w-[450px] mt-10 ">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
