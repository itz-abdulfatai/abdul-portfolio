import { useEffect, useState } from "react";
// import SettingContext from "../../contexts/settingContext"
import Count from "../global/Count";
import Logo from "../global/Logo";
import { scrollR } from "../../utils/scrollR";
import CountUp from "../global/CountUp";

function About() {
  useEffect(() => {
    scrollR("aaaa", "bottom");
  }, []);
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      className=" flex items-center justify-center 2xl:-mt-36"
    >
      <div className=" aaaa relative w-[90%] rounded-3xl p-4 md:p-16 text-2xl h-[90%] bg-x2 flex flex-col gap-2">
        <p className="md:max-w-[90%] text-base">
          <span className="text-3xl text-highlight">Hi</span>, I&apos;m
          Abdulfatai Aliyu, a full-stack <strong> web </strong>and{" "}
          <strong>mobile app</strong> developer and{" "}
          <strong> digital marketing </strong>specialist with 3 years of
          hands-on experience building and scaling real-world products.
          <br />
          <br />I help businesses design, build, and grow high-performance web
          and mobile applications that are secure, scalable, and conversion
          focused. My work ranges from e-commerce platforms and business
          applications to sales funnels, internal tools, and enterprise-grade
          backend systems
          {!expanded ? " ..." : "."}
        </p>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-1000 ease-in-out 
    ${
      expanded
        ? " max-h-[800px] sm:max-h-[370px] opacity-100 md:max-h-[330px] lg:max-h-[420px] xl:max-h-[320px] 2xl:max-h-[270px]"
        : "max-h-0 opacity-0"
    }
  `}
        >
          <div className="md:max-w-[90%] text-base">
            On the development side, I specialize in modern JavaScript
            ecosystems and cloud-ready architectures, building fast and reliable
            systems using both monolithic and microservices approaches. I focus
            heavily on performance, security, maintainability, and user
            experience, not just shipping features. Beyond development, I
            support growth through data-driven digital marketing, managing paid
            advertising across major platforms and setting up CRMs, funnels, and
            AI automation systems that turn traffic into revenue.
            <br />
            <br />
            What sets me apart is my ability to bridge technology and business
            goals. I don&apos;t just build or market products, I help clients
            make better technical and growth decisions that save time, reduce
            costs, and scale sustainably. <br />
            <br />
            <strong className="font-semibold">
              If you&apos;re looking for a reliable partner to build, improve,
              or grow your product the right way, let&apos;s talk.
            </strong>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-highlight text-base  text-left self-start flex items-center gap-2"
        >
          {expanded ? (
            "Show less"
          ) : (
            <>
              Read more <i className="bx bx-chevron-down relative top-0.5"></i>
            </>
          )}
        </button>

        <div className=" flex sm:items-center flex-col sm:flex-row gap-10 mt-10">
          <div className=" flex flex-col gap-2">
            <Count count={46} />
            <span className=" text-base">Projects done</span>
          </div>
          <div className=" flex flex-col gap-2">
            <Count count={3} />
            <span className=" text-base">Years of experience</span>
          </div>

          <div className=" flex flex-col gap-2">
            <div className=" flex items-center">
              <CountUp
                from={0}
                to={100}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-[40px] font-[600]"
              />
              <span className=" text-[40px] font-[600] text-highlight">%</span>
            </div>
            <span className=" text-base">Client satisfaction</span>
          </div>
          <div className=" absolute bottom-20 right-6 xl:right-12 hidden lg:block ">
            <Logo />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

// Hi, I&apos;m Abdulfatai! I specialize in crafting nice UIs and turning
// ideas into engaging online experiences. As a seasoned full-stack
// developer and digital marketer, I build dynamic websites using Mern
// stack, React.js, Next.js, Node.js, Express.js, MongoDB, Firebase,
// Supabase, Tailwind CSS, and more. I also excel in WordPress
// development, creating landing pages, blogs, and e-commerce stores with
// Elementor, WooCommerce, Jetpack, Tutor LMS and many more to enhance
// functionality and UX. Beyond coding, I leverage Klaviyo, Facebook &
// Instagram Ads, Go High Level, Google Analytics, Email marketing and
// more to optimize conversion rates, sales, and website traffic. Partner
// with me for fast, high-quality project delivery at an unbeatable
// price. Let&apos;s connect!
