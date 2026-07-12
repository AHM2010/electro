import { useState } from "react";
import { SquareCheck } from "lucide-react";

const socialLinks = [
  { Icon: "bi-instagram", label: "Instagram" },
  { Icon: "bi-tiktok", label: "TikTok" },
  { Icon: "bi-twitter-x", label: "X" },
];

export default function Contact() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage(
      "Thank you for sending your message. Our team will contact you as soon as possible.",
    );

    const subject = `New message from ${name}`;
    const body = `Name: ${name}
Email: ${email}

${message}`;

    window.location.href = `mailto:customerservice@electro.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };
  return (
    <section
      className="bg-white px-6 md:px-16 py-24"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-offset="0"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <header className="mb-10 sm:mb-12">
          <h1 className="title text-3xl font-semibold text-blue-500 sm:text-4xl">
            Contact
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Reach out to our team for support, inquiries, or anything related to
            your experience with Electro.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_.7fr] gap-16 lg:gap-24">
          <div>
            <h2 className="title text-3xl md:text-5xl font-semibold tracking-tight text-blue-500">
              We would love to hear from you.
            </h2>

            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl">
              Whether you're searching for the latest technology or need support
              with your order, we're always ready to assist you.
            </p>

            <form className="mt-14" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  autoComplete="name"
                  required
                  onChange={() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className="border border-gray-300 px-5 py-4 outline-none rounded-sm text-lg focus:border-blue-500 transition duration-300"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  onChange={() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className="border border-gray-300 px-6 py-5 outline-none rounded-sm text-lg focus:border-blue-500 transition duration-300"
                />
              </div>

              <textarea
                name="message"
                placeholder="Message"
                rows={10}
                required
                onChange={() => {
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="w-full mt-8 border border-gray-300 px-6 py-5 outline-none rounded-sm text-lg resize-none focus:border-blue-500 transition duration-300"
              />

              {errorMessage && (
                <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
              )}

              {successMessage && (
                <p className="mt-4 text-sm flex items-start gap-2 border-emerald-200 bg-emerald-50 text-emerald-800 px-4 py-3 rounded-md">
                  <SquareCheck className="h-5 w-5 shrink-0" />
                  <span>{successMessage}</span>
                </p>
              )}

              <button
                type="submit"
                className="mt-8 bg-blue-500 text-white px-8 py-3 text-lg rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="lg:pt-8">
            <div>
              <h3 className="title text-3xl font-semibold text-blue-500">
                Address
              </h3>

              <p className="mt-5 text-lg text-gray-500">
                Saudi Arabia - Medina
              </p>
            </div>

            <div className="mt-16">
              <h3 className="title text-3xl font-semibold text-blue-500">
                Social Media
              </h3>

              <div className="flex items-center gap-8 mt-6">
                {socialLinks.map((social) => (
                  <button
                    key={social.label}
                    type="button"
                    aria-label={social.label}
                    className="w-14 h-14 rounded-full bg-[#f5f5f5] flex items-center justify-center shadow-sm hover:scale-115 hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <i className={`bi ${social.Icon} w-6 h-6`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
