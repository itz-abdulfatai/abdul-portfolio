function BookMeeting() {
  return (
    <a
      href="https://calendly.com/abdulfataialiyu4/book"
      className="form-input flex justify-center items-center gap-5 group "
    >
      <i className="bx bx-calendar-plus text-tertiary text-xl group-hover:text-highlight transition duration-300"></i>
      <p className="text-tertiary text-sm group-hover:text-highlight transition duration-300">
        Prefer a call? Book a meeting instead.
      </p>
    </a>
  );
}

export default BookMeeting;
