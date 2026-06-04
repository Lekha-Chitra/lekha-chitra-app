import LoginForm from "../components/LoginForm";
import SplitLogo from "../components/SplitLogo";
import Branding from "../components/Branding";
// import logo from "../../../assets/images/logo.png";
import bgImage from "../../../assets/images/login-banner.jpg";

function Login() {
  return (
    // `relative` here is the anchor for the desktop split-logo
    <div className="relative min-h-screen flex flex-col lg:flex-row">
 
      {/* ── Left: banner image (desktop only) ── */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={bgImage}
          alt="Construction site"
          className="w-full h-full object-cover"
        />
      </div>
 
      {/* ── Desktop split-logo: sits on the boundary between the two panels ── */}
      {/*
        • left-1/2  → horizontally centered on the split line
        • top-1/2   → vertically centered in the full viewport
        • -translate-x-1/2 / -translate-y-1/2 → centre the circle on that point
        • z-20      → above both panels
        • pointer-events-none → logo never blocks clicks on the form
      */}
      <div className="hidden lg:flex absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <SplitLogo size={150} />
      </div>
 
      {/* ── Right: login panel ── */}
      <div className="w-full lg:w-1/2 bg-[#032A4E] flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md flex flex-col items-center gap-6">
 
          {/* Branding (slogan + title) */}
          <Branding />
 
          {/* Mobile-only logo (no split needed here) */}
          <div className="lg:hidden">
            <SplitLogo size={160} />
          </div>
 
          {/* Login form */}
          <div className="w-full px-4 py-3">
            <LoginForm />
          </div>
 
          {/* Footer hint */}
          <p className="text-white text-sm md:text-base opacity-70">
            Please login to your account…
          </p>
 
        </div>
      </div>
 
    </div>
  );
}
 
export default Login;