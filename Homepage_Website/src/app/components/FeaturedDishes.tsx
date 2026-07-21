import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DishCard {
  tag: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export default function FeaturedDishes() {
  const dishes: DishCard[] = [
    {
      tag: "Nổi bật",
      name: "Bánh tráng cuốn thịt heo",
      description: "Một món ăn quen của miền Trung nhưng cần đủ sự tinh tế từ thịt heo, rau sống đến chén mắm nêm pha đúng vị.",
      image: "https://images.unsplash.com/photo-1676471932681-45fa972d848a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwc2VhZm9vZCUyMGRpc2glMjBmaW5lJTIwZGluaW5nJTIwcGxhdGVkfGVufDF8fHx8MTc4MDY1Mjg2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Signature Vietnamese dish"
    },
    {
      tag: "Combo gia đình",
      name: "Những món ăn dành cho bữa sum họp",
      description: "Những lựa chọn phù hợp để nhiều người có thể cùng thưởng thức và sẻ chia trên một bàn ăn.",
      image: "https://images.unsplash.com/photo-1668072921663-604caa194507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxWaWV0bmFtZXNlJTIwc2VhZm9vZCUyMGRpc2glMjBmaW5lJTIwZGluaW5nJTIwcGxhdGVkfGVufDF8fHx8MTc4MDY1Mjg2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Family style Vietnamese dish"
    },
    {
      tag: "Hải sản",
      name: "Hải sản miền Trung",
      description: "Tươi ngon mỗi ngày, chế biến vừa đủ để giữ nguyên vị ngọt tự nhiên của nguyên liệu.",
      image: "https://images.unsplash.com/photo-1658041133672-17552737d6d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMGZpbmUlMjBkaW5pbmclMjBlbGVnYW50JTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc4MDcwNjUwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Seafood Vietnamese dish"
    },
    {
      tag: "Đặc sản",
      name: "Đặc sản Việt ba miền",
      description: "Sự đa dạng của ẩm thực Việt được chọn lọc để mỗi lần ghé thăm đều có thêm điều mới để khám phá.",
      image: "https://images.unsplash.com/photo-1668072921628-6e024f6aadd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxBc2lhbiUyMGZpbmUlMjBkaW5pbmclMjBlbGVnYW50JTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc4MDcwNjUwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Vegetarian Vietnamese dish"
    }
  ];

  return (
    <section className="py-32" style={{ backgroundColor: "var(--warm-white)" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1120px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        {/* Heading Row */}
        <div className="mb-14">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-6">
            <div className="max-w-2xl">
              <p
                className="text-sm tracking-widest uppercase mb-4"
                style={{ color: "var(--brand-red)" }}
              >
                MÓN NỔI BẬT TẠI MADAME LÂN
              </p>

              <h2
                style={{
                  fontSize: "48px",
                  fontWeight: "600",
                  lineHeight: "1.2",
                  color: "var(--charcoal)"
                }}
              >
                Hương vị Việt được chăm chút trong từng món ăn
              </h2>
            </div>

            <button
              className="px-8 py-3.5 rounded-md transition-all hover:opacity-90 flex-shrink-0"
              style={{
                backgroundColor: "var(--brand-red)",
                color: "var(--warm-white)"
              }}
            >
              Xem thực đơn
            </button>
          </div>

          <p
            className="max-w-2xl"
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "var(--muted-foreground)"
            }}
          >
            Từ những món quen thuộc của miền Trung đến các món ăn Việt được yêu thích, mỗi món đều được chế biến với sự chỉn chu để giữ trọn vị ngon và cảm giác thân thuộc.
          </p>
        </div>

        {/* 4-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="bg-[var(--ivory)] rounded-3xl overflow-hidden hover:shadow-lg transition-shadow"
              style={{ height: "460px" }}
            >
              {/* Image */}
              <div className="h-[280px] overflow-hidden">
                <ImageWithFallback
                  src={dish.image}
                  alt={dish.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs tracking-wide mb-3"
                  style={{
                    backgroundColor: "var(--warm-white)",
                    color: "var(--brand-red)",
                    border: "1px solid var(--border)"
                  }}
                >
                  {dish.tag}
                </span>

                <h3
                  className="mb-2"
                  style={{
                    fontSize: "19px",
                    fontWeight: "600",
                    color: "var(--charcoal)",
                    lineHeight: "1.3"
                  }}
                >
                  {dish.name}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: "var(--muted-foreground)"
                  }}
                >
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
