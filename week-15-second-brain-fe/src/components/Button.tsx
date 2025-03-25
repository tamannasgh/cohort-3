import {ReactElement} from "react";

interface Buttonprops{
  text: string;
  varient: "primary" | "secondary";
  startIcon ?: ReactElement;
}

const varientStyles = {
  "primary": "bg-primary text-white",
  "secondary": "bg-secondary text-primary"
}

const defaultStyles = "px-4 py-2 rounded-lg cursor-pointer flex items-center";

function Button({text, varient, startIcon}: Buttonprops){
  return <button className={`${varientStyles[varient]} ${defaultStyles}`}>
    {startIcon && <div className="pr-2">{startIcon}</div>}
    {text}
    </button>
} 

export default Button;