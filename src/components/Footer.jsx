import { Link } from "react-router-dom";
import { inputStyles } from "./checkout/FormField";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/phones", label: "Phones" },
  { to: "/tablets", label: "Tablets" },
  { to: "/laptops", label: "Laptops" },
  { to: "/contact", label: "Contact" },
];

const socialLinks = [
  { Icon: "bi-instagram", label: "Instagram" },
  { Icon: "bi-tiktok", label: "TikTok" },
  { Icon: "bi-twitter-x", label: "X" },
];

const footerLinkClassName = `
  relative
  w-fit
  text-gray-500
  hover:text-blue-500
  transition-colors
  duration-300
  after:content-['']
  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[0.5px]
  after:w-full
  after:bg-blue-500
  after:scale-x-0
  after:origin-left
  after:transition-transform
  after:duration-300
  hover:after:scale-x-100
`;

export default function Footer() {
  return (
    <footer
      className="bg-[#f5f5f5] px-6 md:px-16 py-16 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.15)]"
      data-aos="fade-up"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <div>
          <h2 className="title text-3xl md:text-5xl font-light tracking-tight text-blue-500">
            Let's get in touch
          </h2>

          <p className="mt-4 text-gray-500 text-lg">
            Sign up for our newsletter and receive 10% off your first order
          </p>

          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className={inputStyles}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="w-[50%] bg-blue-500 text-white px-8 py-3 my-4 rounded-md hover:bg-blue-700 transition-all duration-300 cursor-pointer"
            >
              Subscribe now
            </button>
          </form>
        </div>

        <div className="lg:mx-auto">
          <h3 className="text-xl font-medium text-gray-900">Quick links</h3>

          <ul className="mt-6 space-y-4 text-gray-500">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={footerLinkClassName}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:ml-auto">
          <h3 className="text-xl font-medium text-gray-900">Our socials</h3>

          <div className="flex gap-4 mt-6">
            {socialLinks.map((social) => (
              <button
                key={social.label}
                type="button"
                aria-label={social.label}
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-115 hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <i className={`bi ${social.Icon} w-6 h-6`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-300/70 pt-8 text-gray-500">
        <p>&copy; ELECTRO 2026</p>

        <div className="flex items-center gap-2 text-sm">
          <span>Made by</span>
          <a
            href="https://ahm2010.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-500 underline-offset-4 transition-colors duration-300 hover:text-blue-700 hover:underline"
          >
            Ahmed Ashraf
          </a>
        </div>
      </div>
    </footer>
  );
}
