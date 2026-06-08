export default function LocationContact() {
  const contactItems = [
    {
      label: "Địa chỉ",
      value: "4 Bạch Đằng, Hải Châu, Đà Nẵng"
    },
    {
      label: "Giờ mở cửa",
      value: "10:00 – 22:00"
    },
    {
      label: "Hotline",
      value: "0900 XXX XXX"
    },
    {
      label: "Email",
      value: "info@madamelan.vn"
    }
  ];

  const infoChips = ["Family Friendly", "Private Dining", "Central Location"];

  return (
    <section className="py-32" style={{ backgroundColor: "var(--warm-white)" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1120px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Information */}
          <div>
            <p
              className="text-sm tracking-widest uppercase mb-4"
              style={{ color: "var(--brand-red)" }}
            >
              THÔNG TIN NHÀ HÀNG
            </p>

            <h2
              className="mb-6"
              style={{
                fontSize: "48px",
                fontWeight: "600",
                lineHeight: "1.2",
                color: "var(--charcoal)"
              }}
            >
              Ghé thăm Madame Lân tại Đà Nẵng
            </h2>

            <p
              className="mb-10"
              style={{
                fontSize: "18px",
                lineHeight: "1.7",
                color: "var(--muted-foreground)"
              }}
            >
              Dễ dàng tìm đường, đặt bàn hoặc liên hệ trực tiếp với đội ngũ nhà hàng.
            </p>

            {/* Contact Items */}
            <div className="mb-10 space-y-6">
              {contactItems.map((item) => (
                <div key={item.label}>
                  <p
                    className="mb-1 text-sm tracking-wide"
                    style={{
                      color: "var(--muted-foreground)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "var(--charcoal)"
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <button
                className="px-8 py-3.5 rounded-md transition-all hover:opacity-90"
                style={{
                  backgroundColor: "var(--brand-red)",
                  color: "var(--warm-white)"
                }}
              >
                Đặt bàn
              </button>
              <button
                className="px-8 py-3.5 rounded-md transition-all hover:opacity-90"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--brand-red)",
                  border: "1.5px solid var(--brand-red)"
                }}
              >
                Chỉ đường
              </button>
              <button
                className="px-8 py-3.5 rounded-md transition-all hover:underline"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--brand-red)"
                }}
              >
                Zalo tư vấn
              </button>
            </div>
          </div>

          {/* Right: Map Card */}
          <div>
            <div
              className="bg-[var(--ivory)] rounded-3xl overflow-hidden"
              style={{
                height: "520px",
                border: "1px solid var(--border)"
              }}
            >
              {/* Map Placeholder */}
              <div
                className="w-full h-full flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #F5F3EE 0%, #E8E6E1 100%)"
                }}
              >
                {/* Minimal map style placeholder */}
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--brand-red)",
                      opacity: 0.2
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                        fill="var(--brand-red)"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    4 Bạch Đằng, Hải Châu
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Đà Nẵng
                  </p>
                </div>
              </div>
            </div>

            {/* Info Chips */}
            <div className="flex flex-wrap gap-3 mt-6">
              {infoChips.map((chip) => (
                <span
                  key={chip}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    backgroundColor: "var(--ivory)",
                    color: "var(--charcoal)",
                    border: "1px solid var(--border)"
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
