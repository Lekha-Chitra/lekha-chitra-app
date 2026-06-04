import LoginForm from "../components/LoginForm";
import logo from "../../../assets/images/logo.png";
import bgImage from "../../../assets/images/login-banner.jpg";

function Login() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={bgImage}
          alt="Construction"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="relative w-full lg:w-1/2 bg-[#032A4E] flex flex-col items-center min-h-screen px-8">
        {/* Floating Logo */}
        <div className="hidden lg:block absolute left-0 top-[180px] -translate-x-1/2 z-20">
          <div className="relative w-[140px] h-[140px]   xl:w-[200px] xl:h-[200px]  rounded-full overflow-hidden shadow-xl">
            {/* Blue Half */}
            <div className="absolute left-0 top-0 w-1/2 h-full bg-[#032A4E]" />

            {/* Yellow Half */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-[#E59C11]" />

            {/* White Circle */}
            <div className="absolute inset-[20px] bg-white rounded-full flex items-center justify-center">
              <img
                src={logo}
                alt="Lekhachitra Logo"
                className="w-[100px] h-[100px] object-contain rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Slogan */}
        <p className="mt-4 lg:mt-20 text-center text-white text-lg md:text-xl lg:text-2xl">
          हरेक खर्चको स्पष्ट हिसाब, सफल निर्माणको बलियो आधार।
        </p>

        {/* Welcome Text */}
        <div className="text-center mt-2">
          <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-7xl">
            Welcome to
          </h1>

          <h2 className="text-[#FFAF4D] font-bold text-4xl md:text-5xl lg:text-6xl mt-2">
            लेखाचित्र
          </h2>
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden mt-10">
          <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden">
            <div className="absolute left-0 w-1/2 h-full bg-[#032A4E]" />
            <div className="absolute right-0 w-1/2 h-full bg-[#E59C11]" />

            <div className="absolute inset-[16px] bg-white rounded-full flex items-center justify-center">
              <img src={logo} alt="logo" className="w-16 h-16 object-contain" />
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-[350px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[450px] mt-12 lg:mt-20">
          <LoginForm />
        </div>

        {/* Footer Text */}
        <p className="text-white text-sm md:text-base lg:text-lg mt-4 xl:mt-8 ">
          Please login to your account...
        </p>
      </div>
    </div>
  );
}

export default Login;
