function Input({ type = "text", placeholder, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...props}
      className="
        w-full
        h-[50px]
        md:h-[60px]
        xl:h-[70px]
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
