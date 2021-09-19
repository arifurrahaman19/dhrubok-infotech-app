const Button = ({ btnText, onClick, className, type }) => {
  return (
    <button
      type={type}
      className={`primary-button ${className}`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
