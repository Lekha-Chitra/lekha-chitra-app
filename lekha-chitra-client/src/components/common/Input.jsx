function Input({
  type = "text",
  placeholder,
  className = "",
  rightIcon,
  ...props
}) {
  return (
    <div className="relative w-full  sm:w-[100%] md:w-[120%] xl:w-[120%] 2xl:w-[350px]">
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className={`
          w-full
         
           
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
          ${rightIcon ? "pr-10" : ""}
          ${className}
        `}
      />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export default Input;
