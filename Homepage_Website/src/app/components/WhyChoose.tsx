export default function WhyChoose() {
  const reasons = [
    {
      icon: "cuisine",
      title: "Món Việt quen mà khó làm ở nhà",
      description: "Từ món cuốn, món nướng đến hải sản miền Trung — mỗi món được chế biến theo cách chỉn chu để giữ trọn hương vị quen thuộc mà vẫn đủ tinh tế cho những buổi gặp gỡ đặc biệt."
    },
    {
      icon: "location",
      title: "Không gian cho mọi cuộc gặp gỡ",
      description: "Bữa cơm gia đình, tiếp khách hay một buổi sum họp cuối tuần — mỗi khu vực tại Madame Lân đều được chuẩn bị để mang đến cảm giác thoải mái và gần gũi."
    },
    {
      icon: "family",
      title: "Hơn 200 món ăn để chiều lòng nhiều khẩu vị",
      description: "Dù là gia đình nhiều thế hệ, bạn bè hay đoàn khách đông người, luôn có những lựa chọn phù hợp để ai cũng tìm thấy món mình thích."
    }
  ];

  return (
    <section className="py-32" style={{ backgroundColor: "var(--warm-white)" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1120px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        {/* Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p
            className="text-sm tracking-widest uppercase mb-4"
            style={{ color: "var(--brand-red)", fontWeight: "600" }}
          >
            Vì sao nhiều thực khách chọn Madame Lân
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
            Một nơi để ai cũng tìm thấy món mình yêu thích
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "var(--muted-foreground)"
            }}
          >
            Một bữa ăn trọn vẹn không chỉ là món ăn ngon, mà còn là khi mọi người cùng cảm thấy thoải mái, được chăm chút và tận hưởng thời gian bên nhau.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="text-center p-6"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{
                  backgroundColor: "var(--ivory)",
                  border: "2px solid var(--brand-red)"
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--brand-red)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {reason.icon === "cuisine" && (
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v7M10 1v7M14 1v7" />
                  )}
                  {reason.icon === "location" && (
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  )}
                  {reason.icon === "family" && (
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  )}
                </svg>
              </div>

              <h3
                className="mb-3"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "var(--charcoal)"
                }}
              >
                {reason.title}
              </h3>

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "var(--muted-foreground)"
                }}
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
