import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Hero() {
  const trustCues = [
    "Hơn 200 món ăn Việt",
    "Không gian phù hợp nhóm & gia đình",
    "Vị trí trung tâm Đà Nẵng"
  ];

  const quickShortcuts = [
    { label: "Xem thực đơn", icon: "menu" },
    { label: "Khám phá không gian", icon: "space" },
    { label: "Đặt bàn", icon: "calendar" }
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
              style={{ color: "var(--brand-red)", fontWeight: "600" }}
            >
              Ẩm thực Việt • Không gian sum họp • Đà Nẵng
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
              Nơi vị Việt được sẻ chia trong những bữa gặp gỡ trọn vẹn
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
              Từ những món ăn quen thuộc được nâng niu bằng nguyên liệu tuyển chọn, đến không gian rộng mở cho gia đình, bạn bè và những buổi gặp gỡ đáng nhớ — Madame Lân mong mỗi lần dùng bữa đều là một khoảnh khắc đáng để tận hưởng.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                className="px-10 py-4 rounded-md transition-all hover:opacity-90 shadow-md"
                style={{
                  backgroundColor: "var(--brand-red)",
                  color: "var(--warm-white)",
                  fontSize: "17px",
                  fontWeight: "600"
                }}
              >
                Đặt bàn hôm nay
              </button>
              <button
                className="px-10 py-4 rounded-md transition-all hover:bg-opacity-10"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--charcoal)",
                  border: "1.5px solid var(--charcoal)",
                  fontSize: "17px",
                  fontWeight: "500"
                }}
              >
                Xem thực đơn
              </button>
            </div>

            {/* Trust Cues */}
            <div className="flex flex-wrap gap-3 mb-8">
              {trustCues.map((cue) => (
                <span
                  key={cue}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    backgroundColor: "var(--ivory)",
                    color: "var(--warm-brown)",
                    border: "1px solid var(--border)"
                  }}
                >
                  {cue}
                </span>
              ))}
            </div>

            {/* Quick Shortcuts */}
            <div className="flex flex-wrap gap-6">
              {quickShortcuts.map((shortcut) => (
                <button
                  key={shortcut.label}
                  className="flex items-center gap-2 transition-colors hover:opacity-70"
                  style={{ color: "var(--charcoal)" }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--ivory)",
                      border: "1px solid var(--border)"
                    }}
                  >
                    {shortcut.icon === "menu" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                      </svg>
                    )}
                    {shortcut.icon === "space" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      </svg>
                    )}
                    {shortcut.icon === "calendar" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-medium">{shortcut.label}</span>
                </button>
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
