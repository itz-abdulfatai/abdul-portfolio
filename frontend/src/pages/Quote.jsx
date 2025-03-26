import {  useContext, useRef, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import ReactGA from 'react-ga4';
import Icon from "../components/global/Icon";
import SettingContext from "../contexts/settingContext";
import { useLocation } from "react-router-dom";

function Quote() {
  const { settings } = useContext(SettingContext);
  const { socials } = settings;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const capRef = useRef(null);

  const {search} = useLocation();
  const source = new URLSearchParams(search).get('source');

  async function validateEmail(email) {
    try {
      const response = await axios.get(`https://api.emailvalidation.io/v1/info?apikey=${import.meta.env.VITE_EMAIL_VALIDATION_API_KEY}&email=${email}`)
      
      if (response?.data?.smtp_check == true) {
        if (response?.data?.state == 'deliverable') {
          return 'valid'
        } else {
          return ('email is not deliverable, reason: ' + response?.data?.reason)
        }
      } else if (response?.data?.smtp_check == false) {
        if (response?.data?.did_you_mean) {
          return ('email validation failed, did you mean: ' + response?.data?.did_you_mean)
        } else {
          return ('email validation failed, please enter a valid email address')
        }
      } else {
        const response = await axios.get(`https://api.emailvalidation.io/v1/status?apikey=${import.meta.env.VITE_EMAIL_VALIDATION_API_KEY}`)
        if (response?.quotas?.month?.remaining == 0) {
          return 'valid'
        }
      }
    } catch (error) {
      console.log(error)
      return ('email validation failed, Try again later')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    ReactGA.event({
      category: 'Form',
      action: 'Submitted Quote Form',
    });

    const token = await capRef.current.executeAsync()
    if (!token) {
      setError('Please verify that you are not a robot')
      setLoading(false)
      setTimeout(() => {setError(null)}, 3000);
      return
    }

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data)
    
    if (source && source !== 'undefined' && source !== null && source !== '') {
      data.source = source
    }

    const emailValidation = await validateEmail(data.mail)
    if (emailValidation !== 'valid') {
      setLoading(false)
      setError(emailValidation)
      setTimeout(() => {setError(null)}, 6000);
      return
    }

    try {
      setError(null);
      setMessage(null);
      const body = { data: {...data, token} };
      
      const response = await axios.post("/api/tickets/sendQuoteRequest", body);

      if (response?.status == 201) {
        setMessage(response.data.message);
        setError(null);
        e.target.reset();

        const seen = JSON.parse((sessionStorage.getItem('seen'))) == true;
        if (seen) {
          localStorage.setItem('submitted', JSON.stringify(true))
          ReactGA.event({
            category: 'event-popup',
            action: 'opted in for discount event',
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
    <section
      className="flex max-lg:gap-10 justify-between flex-col lg:flex-row items-start min-h-screen py-20 relative px-5 sm:px-10 md:px-16 lg:px-unset"
    >
      <div className=" w-full lg:w-1/2 flex flex-col gap-5 lg:sticky lg:top-20">
        <h2 className="text-[40px] font-[600] max-w-[400px] leading-tight">
          Get a Custom Website Quote
        </h2>
        <p className="max-w-[350px] text-tertiary">
          Tell us about your project and we&apos;ll provide a tailored solution that meets your needs and budget.
        </p>
        <div className="flex md:max-w-[80%] items-end flex-wrap gap-2">
          {socials.map((social, index) => (
            <Icon social={social} key={index} />
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="rrr w-full lg:w-1/2 flex flex-col max-sm:mt-10 gap-3"
      >
        <fieldset className="flex gap-3 max-sm:flex-col">
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input required placeholder="Your Name" className="form-input" type="text" id="name" name="name" />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input required className="form-input" placeholder="your@email.com" type="text" id="email" name="mail" />
          </div>
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="websiteExamples">Do you have any website examples you like?</label>
          <textarea className="form-input" id="websiteExamples" name="websiteExamples" rows="2" placeholder="Share links or descriptions of websites you admire" />
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="existingWebsite">Do you have an existing website? If yes, what features would you like to keep?</label>
          <textarea className="form-input" id="existingWebsite" name="existingWebsite" rows="2" placeholder="Tell us about your current website and what elements you'd like to preserve" />
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="branding">What are your branding preferences (logo, colors, style)?</label>
          <textarea className="form-input" id="branding" name="branding" rows="2" placeholder="Share your branding requirements or if you're open to suggestions" />
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="features">What special features would you like on your website?</label>
          <textarea className="form-input" id="features" name="features" rows="2" placeholder="Describe any specific functionality you need" />
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="purpose">What&apos;s the main purpose of your website?</label>
          <textarea className="form-input" id="purpose" name="purpose" rows="2" placeholder="e.g., generate leads, showcase products, provide information" />
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="pages">What pages would you like on your website?</label>
          <textarea className="form-input" id="pages" name="pages" rows="2" placeholder="e.g., Home, About, Services, Contact" />
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="location">What country are you based in?</label>
          <input required className="form-input" type="text" id="location" name="location" placeholder="Your country" />
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="hosting">Do you have hosting and domain already?</label>
          <input className="form-input" type="text" id="hosting" name="hosting" placeholder="Yes/No" />
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="maintenance">Who will maintain the website after it&apos;s built?</label>
          <textarea className="form-input" id="maintenance" name="maintenance" rows="2" placeholder="Tell us about who will manage the website and their technical experience" />
        </fieldset>

        <fieldset className="form-row">
          <label htmlFor="additional">Additional Information</label>
          <textarea className="form-input" id="additional" name="additional" rows="4" placeholder="Share any other details about your project" />
        </fieldset>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Enhanced Website Solutions</h3>

          <fieldset className="form-row">
            <label htmlFor="seo">Would you like your website to rank higher in search results?</label>
            <select className="form-input" id="seo" name="seo">
              <option  defaultValue value="">Please select</option>
              <option value="yes">Yes, I&apos;m interested</option>
              <option value="no">Not at this time</option>
            </select>
          </fieldset>

          <fieldset className="form-row">
            <label htmlFor="content">Would you like regular content updates to keep your website fresh?</label>
            <select className="form-input" id="content" name="content">
              <option  defaultValue value="">Please select</option>
              <option value="yes">Yes, I&apos;m interested</option>
              <option value="no">Not at this time</option>
            </select>
          </fieldset>

          <fieldset className="form-row">
            <label htmlFor="virtualAssistant">Would you like support with social media management (Instagram, Facebook, blog, etc)?</label>
            <select className="form-input" id="virtualAssistant" name="virtualAssistant">
              <option  defaultValue value="">Please select</option>
              <option value="yes">Yes, I&apos;m interested</option>
              <option value="no">Not at this time</option>
            </select>
          </fieldset>
        </div>

        <button
          disabled={loading}
          className="bg-highlight py-3 rounded-xl text-primary font-[500] capitalize hover:bg-x transition-all hover:text-secondary mt-3 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          {loading ? "Please Wait..." : error ? error : message ? message : "Get Quote"}
        </button>
      </form>
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
