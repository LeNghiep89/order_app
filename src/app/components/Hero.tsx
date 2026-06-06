import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Hero() {
  const trustCues = [
    "Không gian gia đình",
    "Ẩm thực Việt tinh tế",
    "Tiệc riêng"
  ];

  return (
    <section className="relative pt-[88px] overflow-hidden">
      <div
        className="mx-auto"
        style={{ maxWidth: "1280px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        <div className="grid lg:grid-cols-[60fr_40fr] gap-12 items-center min-h-[calc(100vh-88px)]">
          {/* Left: Message */}
          <div className="py-16 lg:py-24">
            {/* Eyebrow */}
            <p
              className="text-sm tracking-widest uppercase mb-6"
              style={{ color: "var(--deep-bronze)" }}
            >
              Vietnamese Premium Dining · Da Nang
            </p>

            {/* Headline */}
            <h1
              className="mb-6"
              style={{
                fontSize: "60px",
                fontWeight: "600",
                lineHeight: "1.2",
                color: "var(--charcoal)",
                maxWidth: "520px"
              }}
            >
              Trải nghiệm ẩm thực Việt cao cấp giữa lòng Đà Nẵng
            </h1>

            {/* Supporting Text */}
            <p
              className="mb-10"
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                color: "var(--muted-foreground)",
                maxWidth: "520px"
              }}
            >
              Không gian sang trọng, món ăn Việt tinh tế và trải nghiệm phù hợp cho gia đình, khách quốc tế và những buổi gặp mặt đáng nhớ.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                className="px-8 py-3.5 rounded-md transition-all hover:opacity-90"
                style={{
                  backgroundColor: "var(--deep-bronze)",
                  color: "var(--warm-white)",
                  fontSize: "16px"
                }}
              >
                Đặt bàn
              </button>
              <button
                className="px-8 py-3.5 rounded-md transition-all hover:bg-opacity-10"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--deep-bronze)",
                  border: "1.5px solid var(--deep-bronze)",
                  fontSize: "16px"
                }}
              >
                Xem thực đơn
              </button>
            </div>

            {/* Trust Cues */}
            <div className="flex flex-wrap gap-3">
              {trustCues.map((cue) => (
                <span
                  key={cue}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    backgroundColor: "var(--ivory)",
                    color: "var(--deep-bronze)",
                    border: "1px solid var(--border)"
                  }}
                >
                  {cue}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative h-[600px] lg:h-[700px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1565895405227-31cffbe0cf86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyZXN0YXVyYW50JTIwZGluaW5nJTIwdGFibGUlMjBmb29kJTIwZWxlZ2FudCUyMHNldHRpbmclMjBob3NwaXRhbGl0eXxlbnwxfHx8fDE3ODA2NTI1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Madame Lân elegant dining experience with food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
