function Input({ type = "text", placeholder, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...props}
      className="
       w-full
        sm:w-[90%]
        md:w-[80%]
        xl:w-[70%]
        2xl:w-[350px]
        h-[40px]
        md:h-[50px]
        xl:h-[60px]
        px-4
        md:px-6
        rounded-[10px]
        bg-white
        text-base
        md:text-lg
        xl:text-xl
        outline-none
      "
    />
  );
}

export default Input;
