import CountUp from "./CountUp"

function Count({count}) {
    const base = Math.floor(count / 5) * 5
    const remainder = count % 5
  
  
    return (
      <div className=" flex items-center">
        <CountUp   from={0} to={base >= 5 ? base : count} separator="," direction="up" duration={1}
 className="count-up-text text-[40px] font-[600]" />
        {/* <p className=" text-[40px] font-[600]"> {base >= 5 ? base : count}</p> */}
        {
          remainder > 0 && 
          <span  className=" text-[40px] font-[600] text-highlight"> +</span>
  
        }
      </div>
    )
  }

  export default Count