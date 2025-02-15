const Button = ({children, onClick, isDisabled, extraClasses}) => {
  return (
    <button onClick={() => {
      if(!isDisabled) {
        onClick();
      }
    }} className={`text-primary-bg font-semibold rounded-sm ${isDisabled ?
      "bg-disabled-btn cursor-not-allowed" : "bg-active-btn cursor-pointer"} m-3 w-60 p-2 
      ${extraClasses}`} >{children}</button>
  );
};

export default Button;