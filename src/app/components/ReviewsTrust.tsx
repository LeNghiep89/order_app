interface Review {
  guestType: string;
  quote: string;
  name: string;
}

export default function ReviewsTrust() {
  const reviews: Review[] = [
    {
      guestType: "Gia đình",
      quote: "Không gian đẹp, món ăn vừa miệng và phù hợp cho gia đình nhiều thế hệ.",
      name: "Khách gia đình"
    },
    {
      guestType: "Khách quốc tế",
      quote: "A refined Vietnamese dining experience with warm hospitality and beautiful presentation.",
      name: "International Guest"
    },
    {
      guestType: "Private Dining",
      quote: "Không gian phù hợp cho buổi gặp mặt quan trọng, dịch vụ chỉn chu và dễ phối hợp.",
      name: "Private Dining Guest"
    }
  ];

  const trustSignals = [
    "Vietnamese Cuisine",
    "Family Friendly",
    "Private Dining",
    "Group Dining",
    "Located in Da Nang"
  ];

  return (
    <section className="py-32" style={{ backgroundColor: "var(--ivory)" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1120px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        {/* Heading Block */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p
            className="text-sm tracking-widest uppercase mb-4"
            style={{ color: "var(--brand-red)" }}
          >
            ĐÁNH GIÁ TỪ KHÁCH HÀNG
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
            Những trải nghiệm được ghi nhớ
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "var(--muted-foreground)"
            }}
          >
            Madame Lân được lựa chọn cho những bữa ăn gia đình, trải nghiệm ẩm thực Việt dành cho khách quốc tế và những buổi gặp gỡ đáng nhớ.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8"
              style={{
                border: "1px solid var(--border)",
                boxShadow: "0 4px 20px rgba(43, 40, 38, 0.04)"
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1.5L9.708 6.208L14.5 6.708L11 10.292L12 15L8 12.708L4 15L5 10.292L1.5 6.708L6.292 6.208L8 1.5Z"
                      fill="var(--muted-gold)"
                    />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p
                className="mb-6"
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "var(--charcoal)",
                  fontStyle: "italic"
                }}
              >
                "{review.quote}"
              </p>

              {/* Guest Info */}
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs tracking-wide mb-2"
                  style={{
                    backgroundColor: "var(--ivory)",
                    color: "var(--brand-red)",
                    border: "1px solid var(--border)"
                  }}
                >
                  {review.guestType}
                </span>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--muted-foreground)"
                  }}
                >
                  {review.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
              style={{
                backgroundColor: "var(--ivory)",
                border: "2px solid var(--border)"
              }}
            >
              <span style={{ fontSize: "24px" }}>G</span>
            </div>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Google Reviews
            </p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
              style={{
                backgroundColor: "var(--ivory)",
                border: "2px solid var(--border)"
              }}
            >
              <span style={{ fontSize: "24px" }}>T</span>
            </div>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              TripAdvisor
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {trustSignals.map((signal) => (
              <span
                key={signal}
                className="px-5 py-2 rounded-full text-sm"
                style={{
                  backgroundColor: "var(--warm-white)",
                  color: "var(--charcoal)",
                  border: "1px solid var(--border)"
                }}
              >
                {signal}
              </span>
            ))}
          </div>

          <p
            className="text-sm"
            style={{
              color: "var(--muted-foreground)",
              fontStyle: "italic"
            }}
          >
            Trusted by families & travelers
          </p>
        </div>
      </div>
    </section>
  );
}
