import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ExperienceCard {
  title: string;
  tag: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
}

export default function DiningExperience() {
  const experiences: ExperienceCard[] = [
    {
      title: "Bữa ăn gia đình",
      tag: "Family Dining",
      description: "Không gian ấm cúng, thực đơn đa dạng, phù hợp cho các buổi sum họp và dùng bữa cùng người thân.",
      cta: "Đặt bàn gia đình",
      image: "https://images.unsplash.com/photo-1699670425934-b30d13e63fea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxWaWV0bmFtZXNlJTIwZmFtaWx5JTIwZGluaW5nJTIwYXRtb3NwaGVyZSUyMHdhcm18ZW58MXx8fHwxNzgwNzA2NTA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Family dining atmosphere"
    },
    {
      title: "Khách quốc tế",
      tag: "International Guests",
      description: "Trải nghiệm món Việt tinh tế trong không gian chỉn chu, dễ tiếp cận cho khách du lịch và đối tác nước ngoài.",
      cta: "Xem thực đơn",
      image: "https://images.unsplash.com/photo-1658041153491-53053d40fada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxBc2lhbiUyMGZpbmUlMjBkaW5pbmclMjBlbGVnYW50JTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc4MDcwNjUwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "International dining experience"
    },
    {
      title: "Tiệc riêng",
      tag: "Private Dining",
      description: "Không gian riêng tư cho sinh nhật, kỷ niệm, tiếp khách hoặc những buổi gặp mặt quan trọng.",
      cta: "Tư vấn tiệc riêng",
      image: "https://images.unsplash.com/photo-1771830916723-df019ee57425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxWaWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMHRhYmxlJTIwc2V0dGluZyUyMHdhcm0lMjBlbGVnYW50fGVufDF8fHx8MTc4MDcwNjUwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Private dining room"
    },
    {
      title: "Khách đoàn",
      tag: "Group Dining",
      description: "Phù hợp cho nhóm khách, đoàn du lịch hoặc công ty cần không gian tiếp đón chỉn chu và thuận tiện.",
      cta: "Gửi yêu cầu đoàn",
      image: "https://images.unsplash.com/photo-1771830916785-bb664cfa84db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxWaWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMHRhYmxlJTIwc2V0dGluZyUyMHdhcm0lMjBlbGVnYW50fGVufDF8fHx8MTc4MDcwNjUwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Group dining setup"
    }
  ];

  return (
    <section className="pt-40 pb-32" style={{ backgroundColor: "var(--ivory)" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1120px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        {/* Heading Block */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p
            className="text-sm tracking-widest uppercase mb-4"
            style={{ color: "var(--deep-bronze)" }}
          >
            TRẢI NGHIỆM TẠI MADAME LÂN
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
            Không gian phù hợp cho nhiều dịp gặp gỡ
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "var(--muted-foreground)"
            }}
          >
            Từ bữa ăn gia đình, trải nghiệm ẩm thực Việt dành cho khách quốc tế đến những buổi tiếp khách và tiệc riêng, Madame Lân mang đến không gian linh hoạt, sang trọng và dễ tiếp cận.
          </p>
        </div>

        {/* 2x2 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              style={{ height: "420px" }}
            >
              {/* Image */}
              <div className="h-[240px] overflow-hidden">
                <ImageWithFallback
                  src={exp.image}
                  alt={exp.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <span
                  className="text-xs tracking-wider uppercase mb-3 block"
                  style={{ color: "var(--muted-gold)" }}
                >
                  {exp.tag}
                </span>

                <h3
                  className="mb-3"
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "var(--charcoal)"
                  }}
                >
                  {exp.title}
                </h3>

                <p
                  className="mb-4"
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "var(--muted-foreground)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {exp.description}
                </p>

                <button
                  className="px-5 py-2.5 rounded-lg text-sm transition-all hover:opacity-90"
                  style={{
                    backgroundColor: exp.tag === "Private Dining" || exp.tag === "Group Dining"
                      ? "transparent"
                      : "var(--deep-bronze)",
                    color: exp.tag === "Private Dining" || exp.tag === "Group Dining"
                      ? "var(--deep-bronze)"
                      : "var(--warm-white)",
                    border: exp.tag === "Private Dining" || exp.tag === "Group Dining"
                      ? "1.5px solid var(--deep-bronze)"
                      : "none"
                  }}
                >
                  {exp.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
