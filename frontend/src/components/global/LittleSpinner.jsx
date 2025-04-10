
function LittleSpinner({className}) {
  return (
    <div className={`spinner-container ${className}`}>
    <div className="cube"><div className="cube__inner"></div></div>
    <div className="cube"><div className="cube__inner middle_cube_2"></div></div>
    <div className="cube"><div className="cube__inner"></div></div>
  </div>

  )
}

export default LittleSpinner