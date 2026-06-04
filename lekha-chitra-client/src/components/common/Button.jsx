// const Button = ({ children, type = "button", onClick, className = "" }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`
//         px-6
//         py-2
//         rounded-full
//         font-medium
//         transition
//         ${className}
//       `}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;

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
