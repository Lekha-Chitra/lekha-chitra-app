import Branding from "../components/Branding";
import ResetPasswordForm from "../components/ResetPasswordForm";
import bgImage from "../../../assets/images/login-banner.jpg";

function ResetPassword() {
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

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-[#032A4E] min-h-screen flex flex-col items-center justify-center px-8 py-10">
        <Branding />

        <div className="w-full max-w-[450px] mt-20">
          <h2 className="text-white text-center text-4xl font-bold mb-4">
            Reset Password
          </h2>

          <p className="text-white text-center mb-8">
            Create a new password for your account.
          </p>

          <ResetPasswordForm />
        </div>

        <p className="text-white mt-8 text-center">
          Password must be at least 8 characters long.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
