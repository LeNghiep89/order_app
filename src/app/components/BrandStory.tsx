import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function BrandStory() {
  const features = [
    {
      number: "01",
      text: "Công thức gia truyền từ miền Trung"
    },
    {
      number: "02",
      text: "Tinh thần hiếu khách Việt Nam"
    },
    {
      number: "03",
      text: "Không gian ấm cúng cho mọi thế hệ"
    }
  ];

  return (
    <section className="py-32" style={{ backgroundColor: "var(--warm-white)" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1120px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Image Composition */}
          <div className="relative h-[700px]">
            {/* Main large image */}
            <div className="absolute top-0 left-0 w-[65%] h-[480px] rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1777502286448-35389817f504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxWaWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMGVsZWdhbnQlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3ODA2NTI4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Madame Lân elegant interior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Signature dish image - top right */}
            <div className="absolute top-[100px] right-0 w-[45%] h-[280px] rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1676471932681-45fa972d848a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwc2VhZm9vZCUyMGRpc2glMjBmaW5lJTIwZGluaW5nJTIwcGxhdGVkfGVufDF8fHx8MTc4MDY1Mjg2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Signature Vietnamese dish"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Table setting detail image - bottom left */}
            <div className="absolute bottom-0 left-[15%] w-[42%] h-[240px] rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1771830937175-c858bc402b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMHRhYmxlJTIwc2V0dGluZyUyMHdhcm0lMjBlbGVnYW50fGVufDF8fHx8MTc4MDcwNjUwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Restaurant table setting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div>
            <p
              className="text-sm tracking-widest uppercase mb-4"
              style={{ color: "var(--brand-red)", fontWeight: "600" }}
            >
              CÂU CHUYỆN MADAME LÂN
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
              Nơi hương vị Việt truyền thống gặp gỡ tinh thần hiếu khách
            </h2>

            <p
              className="mb-10"
              style={{
                fontSize: "18px",
                lineHeight: "1.7",
                color: "var(--muted-foreground)",
                maxWidth: "480px"
              }}
            >
              Madame Lân không chỉ là nhà hàng - đây là nơi những công thức gia truyền từ miền Trung Việt Nam được gìn giữ và tôn vinh. Mỗi món ăn đều mang trong mình câu chuyện về văn hóa ẩm thực và tinh thần mến khách của người Việt.
            </p>

            {/* Premium Feature Rows */}
            <div className="mb-10 space-y-5">
              {features.map((feature) => (
                <div key={feature.number} className="flex items-center gap-5">
                  <span
                    className="text-sm tracking-wider"
                    style={{
                      color: "var(--muted-gold)",
                      fontFamily: "monospace",
                      fontWeight: "500"
                    }}
                  >
                    {feature.number}
                  </span>
                  <div
                    className="h-px flex-grow"
                    style={{
                      backgroundColor: "var(--border)",
                      maxWidth: "40px"
                    }}
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      color: "var(--charcoal)",
                      lineHeight: "1.5",
                      fontWeight: "500"
                    }}
                  >
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className="px-6 py-3 rounded-md transition-all hover:bg-opacity-90"
              style={{
                backgroundColor: "transparent",
                color: "var(--warm-brown)",
                border: "1.5px solid var(--warm-brown)"
              }}
            >
              Khám phá câu chuyện
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
