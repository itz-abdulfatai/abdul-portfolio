import { useContext, useEffect, useRef, useState } from "react";
import SettingContext from "../../contexts/settingContext";
import RotatingText from "../global/RotatingText";
// import { Link } from "react-router-dom";
// import { scrollR } from "../../utils/scrollR"
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import ReactGA from 'react-ga4';
import Icon from "../global/Icon";
// import Spinner from "../global/Spinner";
import Error from "../global/Error";
import LittleSpinner from "../global/LittleSpinner";
import { useLocation } from "react-router-dom";
import BookMeeting from "../global/BookMeeting";
function Contact() {
  const { settings, loading: settingsLoading } = useContext(SettingContext);
  const { socials } = settings;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  // const [captchaToken, setCaptchaToken] = useState(null)

  const { pathname } = useLocation();

  const capRef = useRef(null);
  // console.log(capRef.current)

  useEffect(() => {
    // scrollR('lll', 'left', false)
    // scrollR('rrr', 'right', false)
  }, []);

  // function onChange(token) {
  //   if (token) {
  //     setCaptchaToken(token)
  //     console.log(token)

  //   }

  // }

  async function validateEmail(email) {
    try {
      const response = await axios.get(
        `https://api.emailvalidation.io/v1/info?apikey=${
          import.meta.env.VITE_EMAIL_VALIDATION_API_KEY
        }&email=${email}`
      );

      if (response?.data?.smtp_check == true) {
        if (response?.data?.state == "deliverable") {
          return "valid";
        } else {
          return "email is not deliverable, reason: " + response?.data?.reason;
        }
      } else if (response?.data?.smtp_check == false) {
        if (response?.data?.did_you_mean) {
          return (
            "email validation failed, did you mean: " +
            response?.data?.did_you_mean
          );
        } else {
          return "email validation failed, please enter a valid email address";
        }
      } else {
        const response = await axios.get(
          `https://api.emailvalidation.io/v1/status?apikey=${
            import.meta.env.VITE_EMAIL_VALIDATION_API_KEY
          }`
        );

        if (response?.quotas?.month?.remaining == 0) {
          return "valid";
        }
      }
    } catch (error) {
      console.log(error);
      return "email validation failed, Try again later";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    ReactGA.event({
      category: "Form",
      action: "Submitted Contact Form",
    });

    const token = await capRef.current.executeAsync();
    if (token) {
      // console.log('token gotten')
      // console.log(token)
    } else {
      setError("Please verify that you are not a robot");
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    console.log("has reach to message sending level");
    // alert('Message sent successfully')
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    // console.log(data)
    const emailValidation = await validateEmail(data.mail);

    if (emailValidation !== "valid") {
      setLoading(false);
      setError(emailValidation);

      setTimeout(() => {
        setError(null);
      }, 6000);
      return;
    }

    try {
      setError(null);
      setMessage(null);
      const body = {
        data: {
          name: data.name,
          message: data.message,
          mail: data.mail,
          token,
        },
      };
      // console.log('this is the body')
      // console.log(body)
      const response = await axios.post("/api/tickets/create", body);

      //   console.log(response.data);
      if (response?.status == 201) {
        setMessage(response.data.message);
        setError(null);
        e.target.reset();

        const seen = JSON.parse(sessionStorage.getItem("seen")) == true;

        if (seen) {
          localStorage.setItem("submitted", JSON.stringify(true));

          ReactGA.event({
            category: "event-popup",
            action: " opted in for discount event",
          });
        }
      } else {
        throw new Error(response?.data?.message);
      }
    } catch (error) {
      console.log("an error occured: ", error.message);
      console.log(error);
      console.log(error.response);
      setError(error.message);
      setMessage(null);
    } finally {
      setLoading(false);

      setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 3000);
    }
  }
  return (
    <>
      <section
        id="contact"
        className=" flex justify-between flex-col md:flex-row items-center"
      >
        <div className=" lll w-full  flex flex-col gap-5">
          <h2 className="text-[40px] font-[600] max-w-[400px] leading-tight">
            Contact me for
            {/* for collaboration */}
            <RotatingText
              texts={[" a project", " partnerships", " best solutions"]}
              mainClassName="px-0 sm:px-0 md:px-0 bg-xl text-secondary overflow-hidden py-0.5 sm:py-1 md:py-2  rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 40, stiffness: 500 }}
              rotationInterval={4000}
            />
          </h2>
          <p className=" max-w-[350px] text-tertiary ">
            Reach out today to discuss your project needs and start
            collaborating on something amazing!
          </p>
          {settingsLoading && (
            <div className="w-full  pt-9 h-14 ">
              <LittleSpinner />
            </div>
          )}
          {!loading && socials && (
            <div className=" h-40  flex md:max-w-[80%] items-end flex-wrap gap-2">
              <>
                {socials.map((social, index) => (
                  <Icon social={social} key={index} />
                ))}
              </>
            </div>
          )}
        </div>

        <div className="w-full rrr max-sm:mt-10  flex flex-col gap-8">
          {pathname !== "/" && <BookMeeting />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <fieldset className=" flex gap-3 ">
              <div className=" form-row">
                <label htmlFor="name">Name</label>
                <input
                  required
                  placeholder="Abdulfatai Aliyu"
                  className="form-input"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className=" form-row">
                <label htmlFor="email">Email</label>
                <input
                  required
                  className="form-input"
                  placeholder="abdulfataialiyu4@gmail.com"
                  type="text"
                  id="email"
                  name="mail"
                />
              </div>
            </fieldset>

            <fieldset className=" form-row">
              <label htmlFor="message">Message</label>
              <textarea
                required
                placeholder="Message"
                className="form-input "
                id="message"
                name="message"
                rows="6"
              />
            </fieldset>
            <button
              disabled={loading}
              className=" bg-highlight py-3 rounded-xl text-primary font-[500] capitalize hover:bg-x transition-all hover:text-secondary mt-3 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please Wait..."
                : error
                ? error
                : message
                ? message
                : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <ReCAPTCHA
        size="invisible"
        ref={capRef}
        theme="dark"
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        // onChange={onChange}
      />
    </>
  );
}

export default Contact;


