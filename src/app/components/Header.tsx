import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("VN");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "Home",
    "Menu",
    "Reservation",
    "Gallery",
    "Private Dining",
    "News",
    "Contact"
  ];

  const languages = ["VN", "EN"];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[var(--ivory)] shadow-sm" : "bg-transparent"
      }`}
      style={{ height: "88px" }}
    >
      <div
        className="mx-auto flex items-center justify-between h-full"
        style={{ maxWidth: "1280px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-xl tracking-wide" style={{ color: "var(--charcoal)", fontFamily: "'Playfair Display', serif" }}>
            Madame Lân
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm tracking-wide transition-colors hover:text-[var(--muted-gold)]"
              style={{ color: "var(--charcoal)" }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right side: Language + CTA */}
        <div className="flex items-center gap-6">
          {/* Language Switcher */}
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
                    color: language === lang ? "var(--deep-bronze)" : "var(--charcoal)"
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

          {/* CTA Button */}
          <button
            className="px-6 py-2.5 rounded-md transition-all hover:opacity-90"
            style={{
              backgroundColor: "var(--deep-bronze)",
              color: "var(--warm-white)"
            }}
          >
            Đặt bàn
          </button>
        </div>
      </div>
    </header>
  );
}
