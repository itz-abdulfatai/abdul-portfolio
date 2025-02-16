import StarRating from "../global/StarRating"

function Testimonial({testimonial}) {

  return (
    testimonial &&
    <div className="p-5">

    <div className="md:h-[250px] h-[200px] w-[400px] md:w-[450px] rounded-xl bg-x3 flex flex-col gap-5 p-5">
       <StarRating rating={testimonial?.rating}/>
       
        <p className=" text-sm md:text-lg first-letter:uppercase">
            {testimonial?.comment}
        </p>
        <div className="flex-1 flex flex-col gap-1 justify-end">
                <h3 className="font-[600] capitalize">{testimonial?.clientInfo.name}</h3>
                {
                  testimonial?.clientInfo?.company &&

                <p className="">{testimonial?.clientInfo?.company}</p>
                }
        </div>

    </div>
    </div>
  )
}

export default Testimonial