import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function PrivateDining() {
  const [inquiryData, setInquiryData] = useState({
    name: "",
    guests: "",
    date: "",
    eventType: ""
  });

  const features = [
    {
      number: "01",
      title: "Tiệc gia đình",
      description: "Không gian phù hợp cho những dịp sum họp và kỷ niệm đáng nhớ."
    },
    {
      number: "02",
      title: "Sinh nhật & kỷ niệm",
      description: "Setup riêng tư và linh hoạt theo nhu cầu."
    },
    {
      number: "03",
      title: "Tiếp khách & corporate dining",
      description: "Không gian trang trọng cho các buổi gặp gỡ đối tác."
    },
    {
      number: "04",
      title: "Khách đoàn",
      description: "Thuận tiện cho nhóm khách lớn và tour dining."
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInquiryData({
      ...inquiryData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Private dining inquiry:", inquiryData);
  };

  return (
    <section className="py-32" style={{ backgroundColor: "var(--warm-white)" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1120px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Image */}
          <div className="relative h-[760px]">
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1641834948278-449f060477fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbG9uZyUyMHRhYmxlJTIwZXZlbnQlMjBzZXR1cCUyMGVsZWdhbnR8ZW58MXx8fHwxNzgwNzA2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Private dining event setup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p
              className="text-sm tracking-widest uppercase mb-4"
              style={{ color: "var(--brand-red)" }}
            >
              TIỆC RIÊNG & SỰ KIỆN
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
              Không gian cho những buổi gặp mặt đáng nhớ
            </h2>

            <p
              className="mb-10"
              style={{
                fontSize: "18px",
                lineHeight: "1.7",
                color: "var(--muted-foreground)"
              }}
            >
              Từ tiệc gia đình, sinh nhật đến những buổi tiếp khách và gặp mặt quan trọng, Madame Lân mang đến không gian chỉn chu, linh hoạt và phù hợp cho nhiều nhu cầu riêng biệt.
            </p>

            {/* Features */}
            <div className="mb-10 space-y-6">
              {features.map((feature) => (
                <div key={feature.number} className="flex gap-4">
                  <span
                    className="text-sm tracking-wider flex-shrink-0"
                    style={{
                      color: "var(--muted-gold)",
                      fontFamily: "monospace",
                      fontWeight: "500"
                    }}
                  >
                    {feature.number}
                  </span>
                  <div>
                    <h4
                      className="mb-1"
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "var(--charcoal)"
                      }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.6",
                        color: "var(--muted-foreground)"
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inquiry Card */}
            <div
              className="bg-[var(--ivory)] rounded-2xl p-6 mb-6"
              style={{ border: "1px solid var(--border)" }}
            >
              <h4
                className="mb-4"
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "var(--charcoal)"
                }}
              >
                Gửi yêu cầu tư vấn
              </h4>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Họ tên"
                    value={inquiryData.name}
                    onChange={handleChange}
                    className="px-4 py-2.5 rounded-lg border text-sm"
                    style={{
                      backgroundColor: "var(--warm-white)",
                      borderColor: "var(--border)",
                      color: "var(--charcoal)"
                    }}
                    required
                  />
                  <input
                    type="text"
                    name="guests"
                    placeholder="Số khách"
                    value={inquiryData.guests}
                    onChange={handleChange}
                    className="px-4 py-2.5 rounded-lg border text-sm"
                    style={{
                      backgroundColor: "var(--warm-white)",
                      borderColor: "var(--border)",
                      color: "var(--charcoal)"
                    }}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    name="date"
                    placeholder="Ngày dự kiến"
                    value={inquiryData.date}
                    onChange={handleChange}
                    className="px-4 py-2.5 rounded-lg border text-sm"
                    style={{
                      backgroundColor: "var(--warm-white)",
                      borderColor: "var(--border)",
                      color: "var(--charcoal)"
                    }}
                    required
                  />
                  <select
                    name="eventType"
                    value={inquiryData.eventType}
                    onChange={handleChange}
                    className="px-4 py-2.5 rounded-lg border text-sm"
                    style={{
                      backgroundColor: "var(--warm-white)",
                      borderColor: "var(--border)",
                      color: "var(--charcoal)"
                    }}
                    required
                  >
                    <option value="">Loại sự kiện</option>
                    <option value="family">Tiệc gia đình</option>
                    <option value="birthday">Sinh nhật</option>
                    <option value="corporate">Corporate dining</option>
                    <option value="group">Khách đoàn</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "var(--brand-red)",
                    color: "var(--warm-white)"
                  }}
                >
                  Gửi yêu cầu
                </button>
              </form>
            </div>

            {/* CTAs */}
            <div className="flex gap-4">
              <button
                className="px-6 py-3 rounded-md transition-all hover:opacity-90"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--brand-red)",
                  border: "1.5px solid var(--brand-red)"
                }}
              >
                Tư vấn tiệc riêng
              </button>
              <button
                className="px-6 py-3 rounded-md transition-all hover:underline"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--brand-red)"
                }}
              >
                Gọi nhà hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
