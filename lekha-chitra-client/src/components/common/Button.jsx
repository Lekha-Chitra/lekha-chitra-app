function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`
        font-medium
        transition
        hover:opacity-90
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
