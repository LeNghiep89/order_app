import { useState } from "react";

export default function Footer() {
  const [language, setLanguage] = useState("VN");

  const quickLinks = [
    "Home",
    "Menu",
    "Reservation",
    "Private Dining",
    "Gallery",
    "News",
    "Contact"
  ];

  const socialLinks = [
    { name: "Facebook", icon: "facebook" },
    { name: "Instagram", icon: "instagram" },
    { name: "Zalo", icon: "zalo" }
  ];

  const languages = ["VN", "EN"];

  return (
    <footer
      className="pt-20 pb-10"
      style={{
        backgroundColor: "#F0EDE6",
        borderTop: "1px solid var(--border)"
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "1120px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Left: Brand */}
          <div>
            <h3
              className="text-2xl mb-4 tracking-wide"
              style={{
                color: "var(--charcoal)",
                fontFamily: "'Playfair Display', serif"
              }}
            >
              Madame Lân
            </h3>

            <p
              className="mb-6"
              style={{
                fontSize: "15px",
                lineHeight: "1.7",
                color: "var(--muted-foreground)",
                maxWidth: "280px"
              }}
            >
              Ẩm thực Việt được chăm chút bằng sự chân thành và tinh thần hiếu khách miền Trung.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                  style={{
                    backgroundColor: "var(--brand-red)",
                    color: "var(--warm-white)"
                  }}
                  aria-label={social.name}
                >
                  {social.icon === "facebook" && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {social.icon === "zalo" && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.5-13h-1c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h1c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5zm0 7h-1c-.276 0-.5.224-.5.5v1c0 .276.224.5.5.5h1c.276 0 .5-.224.5-.5v-1c0-.276-.224-.5-.5-.5z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Center: Quick Links */}
          <div>
            <h4
              className="mb-6 text-sm tracking-widest uppercase"
              style={{
                color: "var(--brand-red)",
                fontWeight: "600"
              }}
            >
              Quick Links
            </h4>

            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="block transition-colors hover:opacity-70"
                  style={{
                    fontSize: "15px",
                    color: "var(--charcoal)"
                  }}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Contact */}
          <div>
            <h4
              className="mb-6 text-sm tracking-widest uppercase"
              style={{
                color: "var(--brand-red)",
                fontWeight: "600"
              }}
            >
              Contact
            </h4>

            <div className="space-y-3">
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "var(--charcoal)"
                }}
              >
                4 Bạch Đằng, Đà Nẵng
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "var(--charcoal)"
                }}
              >
                0900 XXX XXX
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "var(--charcoal)"
                }}
              >
                info@madamelan.vn
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            Copyright © {new Date().getFullYear()} Madame Lân
          </p>

          {/* Language Switch */}
          <div className="flex items-center gap-2">
            {languages.map((lang, index) => (
              <div key={lang} className="flex items-center">
                <button
                  onClick={() => setLanguage(lang)}
                  className={`text-sm transition-colors ${
                    language === lang
                      ? "font-medium"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    color: language === lang ? "var(--brand-red)" : "var(--charcoal)"
                  }}
                >
                  {lang}
                </button>
                {index < languages.length - 1 && (
                  <span className="mx-2 text-sm opacity-30">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
