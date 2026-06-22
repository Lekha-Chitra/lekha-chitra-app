function Input({
  type = "text",
  placeholder,
  inputClassName = "",
  className = "",
  rightIcon,
  ...props
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className={`
          w-full
          h-[50px]
          md:h-[50px]
          xl:h-[50px]
          px-4
          md:px-6
          rounded-[10px]
          bg-white
          text-base
          md:text-lg
          xl:text-xl
          outline-none
          ${rightIcon ? "pr-10" : ""}
          ${inputClassName}
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