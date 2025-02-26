interface ButtonProps{
  text: string,
  size: "sm" | "md" | "lg",
  startIcon?: React.ReactElement,
  endIcon?: React.ReactElement,
}

const sizeStyles = {
  "sm": "px-2 py-1 text-sm",
  "md": "px-4 py-2 text-md",
  "lg": "px-6 py-3 text-lg",
}

const Button = (props: ButtonProps) => {
  return (
    <button className={`${sizeStyles[props.size]} bg-blue-400 flex`}>
      {props.startIcon ? <div className="mr-3">{props.startIcon}</div> : null}
      {props.text}
      {props.endIcon ? <div className="mr-3">{props.endIcon}</div> : null}
    </button>
  )
}

export default Button