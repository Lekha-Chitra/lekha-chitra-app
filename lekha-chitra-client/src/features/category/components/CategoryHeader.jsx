import logo from "../../../assets/images/logo.png";

function CategoryHeader() {
  return (
    <header
      className="
        relative
        w-full
        bg-[#032A4E]
        px-4
        sm:px-6
        md:px-8
        lg:px-10
        py-5
      "
    >
      {/* Logo */}
      <div
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2

          sm:left-6
          md:left-8
          lg:left-10
        "
      >
        <div
          className="
            w-12 h-12
            sm:w-16 sm:h-16 
            md:w-20 md:h-20
            lg:w-24 lg:h-24

            rounded-full
            bg-white
            overflow-hidden
            shadow-lg
          "
        >
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Center Text */}
      <div
        className="
          flex
          flex-col
          items-center
          justify-center

          min-h-[90px]
          sm:min-h-[100px]
          md:min-h-[120px]

          px-16
          sm:px-24
          md:px-32
        "
      >
        <h1
          className="
            text-[#E59C11]
            font-bold
            text-center

            text-2xl
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
          "
        >
          Add your Vendor / Bank / Home
        </h1>

        <p
          className="
            mt-2
            max-w-3xl

            text-center
            text-gray-300

            text-xs
            sm:text-sm
            md:text-base
            lg:text-lg
          "
        >
          Create categories to organize construction materials, tools,
          equipment, and workforce records for better site management.
        </p>
      </div>
    </header>
  );
}

export default CategoryHeader;
