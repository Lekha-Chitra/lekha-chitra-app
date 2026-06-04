import logo from "../../../assets/images/logo.png";
function SplitLogo({ size = 160 }) {
  const inset = Math.round(size * 0.13);
  const iconSize = Math.round(size * 0.44);
 
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden shadow-xl flex-shrink-0"
    >
      {/* Half-and-half background */}
      <div className="relative w-full h-full">
        <div className="absolute left-0 top-0 w-1/2 h-full bg-[#032A4E]" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#E59C11]" />
 
        {/* White circle with logo */}
        <div
          className="absolute bg-white rounded-full flex items-center justify-center"
          style={{ inset }}
        >
          <img
            src={logo}
            alt="Lekhachitra logo"
            style={{ width: iconSize, height: iconSize }}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
export default SplitLogo;