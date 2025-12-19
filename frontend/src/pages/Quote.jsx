import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import ReactGA from "react-ga4";
import Icon from "../components/global/Icon";
import SettingContext from "../contexts/settingContext";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import LittleSpinner from "../components/global/LittleSpinner";
import BookMeeting from "../components/global/BookMeeting";
import { scrollR } from "../utils/scrollR";


const services = [
  { id: "web-dev", label: "Web Development" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "ai-automation", label: "AI Automation" },
];

function Quote() {
  const { settings, loading: settingsLoading } = useContext(SettingContext);
  let socials = [];
  if (settings) {
    socials = settings.socials;
  }
  // const { socials } = settings;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [service, setService] = useState("web-dev"); // web-dev | digital-marketing | ai-automation
  const capRef = useRef(null);

  const { search } = useLocation();
  const source = new URLSearchParams(search).get("source");

  useEffect(() => {
    scrollR("llll", "left", false);
    scrollR("rrrr", "right", false);
  }, []);

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
      action: "Submitted Quote Form",
    });

    const token = await capRef.current.executeAsync();
    if (!token) {
      setError("Please verify that you are not a robot");
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    // console.log(data);

    if (source && source !== "undefined" && source !== null && source !== "") {
      data.source = source;
    }

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
      const body = { data: { ...data, token } };

      const response = await axios.post("/api/tickets/sendQuoteRequest", body);

      if (response?.status == 201) {
        setMessage(response.data.message);
        setError(null);
        e.target.reset();

        const seen = JSON.parse(sessionStorage.getItem("seen")) == true;
        if (seen) {
          localStorage.setItem("submitted", JSON.stringify(true));
          ReactGA.event({
            category: "event-popup",
            action: "opted in for discount event",
          });
        }
      } else {
        throw new Error(response?.data?.message);
      }
    } catch (error) {
      console.log("an error occured: ", error.message);
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
      <Helmet>
        <title>Quote | {settings?.name ?? "Abdulfatai Aliyu"}</title>
        <meta
          name="description"
          content="Request a custom website quote tailored to your needs and budget. Let's bring your vision to life."
        />
        <meta
          property="og:title"
          content={`Quote | ${settings?.name ?? "Abdulfatai Aliyu"}`}
        />
        <meta
          property="og:description"
          content="Request a custom website quote tailored to your needs and budget. Let's bring your vision to life."
        />
      </Helmet>
      <section className="flex max-lg:gap-10 justify-between flex-col lg:flex-row items-start min-h-screen py-20 relative px-5 sm:px-10 md:px-16 lg:px-unset">
        <div className="llll w-full lg:w-1/2 flex flex-col gap-5 lg:sticky lg:top-20">
          <h2 className="text-[40px] font-[600] max-w-[400px] leading-tight">
            Get a Custom Website Quote
          </h2>
          <p className="max-w-[350px] text-tertiary">
            Tell us about your project and we&apos;ll provide a tailored
            solution that meets your needs and budget.
          </p>

          {settingsLoading && (
            <div className="w-full  pt-9 h-14 ">
              <LittleSpinner />
            </div>
          )}

          {!settingsLoading && socials && (
            <div className="flex md:max-w-[80%] items-end flex-wrap gap-2">
              {socials.map((social, index) => (
                <Icon social={social} key={index} />
              ))}
            </div>
          )}
        </div>

        <div className="rrrr w-full lg:w-1/2 rrr max-sm:mt-10  flex flex-col gap-8">
          <BookMeeting />

          {/* <p className="text-center text-tertiary -my-4">or</p> */}

          {/* select service */}
          <div className="form-row">
            <label className="">What service are you interested in?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {services.map((serviceOption) => (
                <button
                  key={serviceOption.id}
                  type="button"
                  onClick={() => setService(serviceOption.id)}
                  className={`py-4 px-4 rounded-xl font-[500] transition-all flex flex-col items-center gap-2 duration-300 ${
                    service === serviceOption.id
                      ? "bg-highlight text-primary border border-highlight"
                      : "bg-x2 text-secondary border border-transparent hover:border-highlight"
                  }`}
                >
                  {/* <span className="text-2xl">{serviceOption.icon}</span> */}
                  <span className="text-sm text-center">
                    {serviceOption.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {service === "web-dev" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <input type="hidden" name="service" value={service} />
              <fieldset className="flex gap-3 max-sm:flex-col">
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    placeholder="Your Name"
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    required
                    className="form-input"
                    placeholder="your@email.com"
                    type="email"
                    id="email"
                    name="mail"
                  />
                </div>
              </fieldset>

              <fieldset className="flex gap-3 max-sm:flex-col">
                <div className="form-row">
                  <label htmlFor="phone">Phone</label>
                  <input
                    required
                    className="form-input"
                    placeholder="+1234567890"
                    type="tel"
                    id="phone"
                    name="phone"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="how-did-you-hear-about-abduldev">
                    How did you hear about Abduldev?
                  </label>
                  <input
                    required
                    className="form-input"
                    placeholder="e.g., Google, Social Media"
                    type="text"
                    id="how-did-you-hear-about-abduldev"
                    name="howUserHeardAboutMe"
                  />
                </div>
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="existingWebsite">
                  Do you have an existing website? If yes, what features would
                  you like to keep?
                </label>
                <textarea
                  className="form-input"
                  id="existingWebsite"
                  name="existingWebsite"
                  rows="2"
                  placeholder="Tell us about your current website and what elements you'd like to preserve"
                />
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="purpose">
                  What&apos;s the main purpose of your website?
                </label>
                <textarea
                  className="form-input"
                  id="purpose"
                  name="purpose"
                  rows="2"
                  placeholder="e.g., generate leads, showcase products, provide information"
                />
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="websiteExamples">
                  Do you have any website examples you like?
                </label>
                <textarea
                  className="form-input"
                  id="websiteExamples"
                  name="websiteExamples"
                  rows="2"
                  placeholder="Share links or descriptions of websites you admire"
                />
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="features">
                  What special features would you like on your website?
                </label>
                <textarea
                  className="form-input"
                  id="features"
                  name="features"
                  rows="2"
                  placeholder="Describe any specific functionality you need"
                />
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="branding">
                  What are your branding preferences (logo, colors, style)?
                </label>
                <textarea
                  className="form-input"
                  id="branding"
                  name="branding"
                  rows="2"
                  placeholder="Share your branding requirements or if you're open to suggestions"
                />
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="pages">
                  What pages would you like on your website?
                </label>
                <textarea
                  className="form-input"
                  id="pages"
                  name="pages"
                  rows="2"
                  placeholder="e.g., Home, About, Services, Contact"
                />
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="budget">What is your approximate budget?</label>
                <select className="form-select" id="budget" name="budget">
                  <option value="">Please select</option>
                  <option value="<1000">&lt;$100</option>
                  <option value="1000-5000">$100-$500</option>
                  <option value="5000-10000">$500-$1000</option>
                  <option value=">10000">&gt;$1000</option>
                  <option value="prefer-not-say">Prefer not to say</option>
                </select>
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="location">What country are you based in?</label>
                <input
                  required
                  className="form-input"
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Your country"
                />
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="hosting">
                  Do you have hosting and domain already?
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="hosting"
                  name="hosting"
                  placeholder="Yes/No"
                />
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="maintenance">
                  Who will maintain the website after it&apos;s built?
                </label>
                <textarea
                  className="form-input"
                  id="maintenance"
                  name="maintenance"
                  rows="2"
                  placeholder="Tell us about who will manage the website and their technical experience"
                />
              </fieldset>

              <fieldset className="form-row">
                <label htmlFor="additional">Additional Information</label>
                <textarea
                  className="form-input"
                  id="additional"
                  name="additional"
                  rows="4"
                  placeholder="Share any other details about your project"
                />
              </fieldset>

              <div className="mt-8 border-t pt-6 flex flex-col gap-8">
                <h3 className="text-lg font-semibold mb-4">
                  Enhanced Website Solutions
                </h3>

                <fieldset className="form-row">
                  <label htmlFor="seo">
                    Would you like your website to rank higher in search
                    results?
                  </label>
                  <select className="form-select" id="seo" name="seo">
                    <option defaultValue value="">
                      Please select
                    </option>
                    <option value="yes">Yes, I&apos;m interested</option>
                    <option value="no">Not at this time</option>
                  </select>
                </fieldset>

                <fieldset className="form-row">
                  <label htmlFor="virtualAssistant">
                    Would you like support with social media management/
                    advertising (Instagram, Facebook, blog, etc)?
                  </label>
                  <select
                    className="form-select"
                    id="virtualAssistant"
                    name="virtualAssistant"
                  >
                    <option defaultValue value="">
                      Please select
                    </option>
                    <option value="yes">Yes, I&apos;m interested</option>
                    <option value="no">Not at this time</option>
                  </select>
                </fieldset>

                <fieldset className="form-row">
                  <label htmlFor="content">
                    Would you like regular content updates to keep your website
                    fresh?
                  </label>
                  <select className="form-select" id="content" name="content">
                    <option defaultValue value="">
                      Please select
                    </option>
                    <option value="yes">Yes, I&apos;m interested</option>
                    <option value="no">Not at this time</option>
                  </select>
                </fieldset>
              </div>

              <button
                disabled={loading}
                className="bg-highlight py-3 rounded-xl text-primary font-[500] capitalize hover:bg-x transition-all hover:text-secondary mt-3 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Please Wait..."
                  : error
                  ? error
                  : message
                  ? message
                  : "Get Quote"}
              </button>
            </form>
          )}

          {service === "digital-marketing" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <input type="hidden" name="service" value={service} />
              {/* Common fields */}
              <fieldset className="flex gap-3 max-sm:flex-col">
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    placeholder="Your Name"
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    required
                    className="form-input"
                    placeholder="your@email.com"
                    type="email"
                    id="email"
                    name="mail"
                  />
                </div>
              </fieldset>
              <fieldset className="flex gap-3 max-sm:flex-col">
                <div className="form-row">
                  <label htmlFor="phone">Phone</label>
                  <input
                    required
                    className="form-input"
                    placeholder="+1234567890"
                    type="tel"
                    id="phone"
                    name="phone"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="how-did-you-hear-about-abduldev">
                    How did you hear about Abduldev?
                  </label>
                  <input
                    required
                    className="form-input"
                    placeholder="e.g., Google, Social Media"
                    type="text"
                    id="how-did-you-hear-about-abduldev"
                    name="howUserHeardAboutMe"
                  />
                </div>
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="businessOverview">
                  Tell us about your business or brand
                </label>
                <textarea
                  className="form-input"
                  id="businessOverview"
                  name="businessOverview"
                  rows="2"
                  placeholder="e.g., Industry, size, current online presence"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="goals">
                  What are your main marketing goals?
                </label>
                <textarea
                  className="form-input"
                  id="goals"
                  name="goals"
                  rows="2"
                  placeholder="e.g., Increase leads, boost brand awareness, drive sales"
                  required
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="targetAudience">
                  Who is your target audience?
                </label>
                <textarea
                  className="form-input"
                  id="targetAudience"
                  name="targetAudience"
                  rows="2"
                  placeholder="e.g., Age range, location, interests, demographics"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="currentEfforts">
                  What marketing efforts are you currently using?
                </label>
                <textarea
                  className="form-input"
                  id="currentEfforts"
                  name="currentEfforts"
                  rows="2"
                  placeholder="e.g., Social media, email campaigns, SEO, paid ads"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="platforms">
                  Which platforms/channels do you want to focus on?
                </label>
                <textarea
                  className="form-input"
                  id="platforms"
                  name="platforms"
                  rows="2"
                  placeholder="e.g., Instagram, Google Ads, email marketing, content creation"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="budget">
                  What is your approximate monthly budget?
                </label>
                <select className="form-select" id="budget" name="budget">
                  <option value="">Please select</option>
                  <option value="<500">&lt;$500</option>
                  <option value="500-2000">$500-$2,000</option>
                  <option value="2000-5000">$2,000-$5,000</option>
                  <option value=">5000">&gt;$5,000</option>
                  <option value="prefer-not-say">Prefer not to say</option>
                </select>
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="timeline">What is your desired timeline?</label>
                <input
                  className="form-input"
                  type="text"
                  id="timeline"
                  name="timeline"
                  placeholder="e.g., Start immediately, within 1-3 months"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="location">What country are you based in?</label>
                <input
                  required
                  className="form-input"
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Your country"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="additional">Additional Information</label>
                <textarea
                  className="form-input"
                  id="additional"
                  name="additional"
                  rows="4"
                  placeholder="Share any other details, like competitors or specific campaigns"
                />
              </fieldset>
              {/* Submit button as in your code */}
              <button
                disabled={loading}
                className="bg-highlight py-3 rounded-xl text-primary font-[500] capitalize hover:bg-x transition-all hover:text-secondary mt-3 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Please Wait..."
                  : error
                  ? error
                  : message
                  ? message
                  : "Get Quote"}
              </button>
            </form>
          )}

          {service === "ai-automation" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <input type="hidden" name="service" value={service} />
              {/* Common fields */}
              <fieldset className="flex gap-3 max-sm:flex-col">
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    placeholder="Your Name"
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    required
                    className="form-input"
                    placeholder="your@email.com"
                    type="email"
                    id="email"
                    name="mail"
                  />
                </div>
              </fieldset>
              <fieldset className="flex gap-3 max-sm:flex-col">
                <div className="form-row">
                  <label htmlFor="phone">Phone</label>
                  <input
                    required
                    className="form-input"
                    placeholder="+1234567890"
                    type="tel"
                    id="phone"
                    name="phone"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="how-did-you-hear-about-abduldev">
                    How did you hear about Abduldev?
                  </label>
                  <input
                    required
                    className="form-input"
                    placeholder="e.g., Google, Social Media"
                    type="text"
                    id="how-did-you-hear-about-abduldev"
                    name="howUserHeardAboutMe"
                  />
                </div>
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="businessOverview">
                  Tell us about your business or operations
                </label>
                <textarea
                  className="form-input"
                  id="businessOverview"
                  name="businessOverview"
                  rows="2"
                  placeholder="e.g., Industry, size, current workflows"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="automationGoals">
                  What do you want to automate?
                </label>
                <textarea
                  className="form-input"
                  id="automationGoals"
                  name="automationGoals"
                  rows="2"
                  placeholder="e.g., Customer support, data analysis, inventory management"
                  required
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="currentTools">
                  What tools/systems are you currently using?
                </label>
                <textarea
                  className="form-input"
                  id="currentTools"
                  name="currentTools"
                  rows="2"
                  placeholder="e.g., CRM like Salesforce, spreadsheets, custom software"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="aiFeatures">
                  What AI features are you interested in?
                </label>
                <textarea
                  className="form-input"
                  id="aiFeatures"
                  name="aiFeatures"
                  rows="2"
                  placeholder="e.g., Chatbots, predictive analytics, natural language processing"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="integrations">
                  Any specific integrations needed?
                </label>
                <textarea
                  className="form-input"
                  id="integrations"
                  name="integrations"
                  rows="2"
                  placeholder="e.g., With email, APIs, databases"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="budget">What is your approximate budget?</label>
                <select className="form-select" id="budget" name="budget">
                  <option value="">Please select</option>
                  <option value="<1000">&lt;$1,000</option>
                  <option value="1000-5000">$1,000-$5,000</option>
                  <option value="5000-10000">$5,000-$10,000</option>
                  <option value=">10000">&gt;$10,000</option>
                  <option value="prefer-not-say">Prefer not to say</option>
                </select>
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="timeline">What is your desired timeline?</label>
                <input
                  className="form-input"
                  type="text"
                  id="timeline"
                  name="timeline"
                  placeholder="e.g., Prototype in 1 month, full rollout in 3 months"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="location">What country are you based in?</label>
                <input
                  required
                  className="form-input"
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Your country"
                />
              </fieldset>
              <fieldset className="form-row">
                <label htmlFor="additional">Additional Information</label>
                <textarea
                  className="form-input"
                  id="additional"
                  name="additional"
                  rows="4"
                  placeholder="Share any other details, like data privacy concerns or scalability needs"
                />
              </fieldset>
              {/* Submit button as in your code */}
              <button
                disabled={loading}
                className="bg-highlight py-3 rounded-xl text-primary font-[500] capitalize hover:bg-x transition-all hover:text-secondary mt-3 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Please Wait..."
                  : error
                  ? error
                  : message
                  ? message
                  : "Get Quote"}
              </button>
            </form>
          )}
        </div>
      </section>

      <ReCAPTCHA
        size="invisible"
        ref={capRef}
        theme="dark"
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      />
    </>
  );
}

export default Quote;
