function Button({text, textColor, icon,  className , onclick}) {
  return (

    <>
    <button onClick={onclick} className={` transition-all duration-500 flex justify-between items-center font-[500] px-4 text-${textColor} rounded-xl py-1 ${className}`}>{text && text} <span className="text-3xl font-thin flex items-center justify-center">{icon && icon}</span> </button>
    </>
  )
}

export default Button