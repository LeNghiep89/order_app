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
      tag: "Signature",
      name: "Món signature Madame Lân",
      description: "Hương vị quen thuộc được trình bày tinh tế, phù hợp để bắt đầu trải nghiệm.",
      image: "https://images.unsplash.com/photo-1676471932681-45fa972d848a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwc2VhZm9vZCUyMGRpc2glMjBmaW5lJTIwZGluaW5nJTIwcGxhdGVkfGVufDF8fHx8MTc4MDY1Mjg2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Signature Vietnamese dish"
    },
    {
      tag: "Family Favorite",
      name: "Món dùng chung cho gia đình",
      description: "Dễ chia sẻ, phù hợp cho bữa ăn sum họp và kết hợp cùng nhiều món khác.",
      image: "https://images.unsplash.com/photo-1668072921663-604caa194507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxWaWV0bmFtZXNlJTIwc2VhZm9vZCUyMGRpc2glMjBmaW5lJTIwZGluaW5nJTIwcGxhdGVkfGVufDF8fHx8MTc4MDY1Mjg2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Family style Vietnamese dish"
    },
    {
      tag: "Seafood",
      name: "Hải sản chọn lọc",
      description: "Nguyên liệu tươi ngon, chế biến theo phong vị Việt tinh tế.",
      image: "https://images.unsplash.com/photo-1658041133672-17552737d6d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMGZpbmUlMjBkaW5pbmclMjBlbGVnYW50JTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc4MDcwNjUwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Seafood Vietnamese dish"
    },
    {
      tag: "Vegetarian Option",
      name: "Lựa chọn thanh nhẹ",
      description: "Hương vị cân bằng, phù hợp cho món Việt nhẹ nhàng và tinh tế.",
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
                style={{ color: "var(--deep-bronze)" }}
              >
                MÓN ĂN ĐẶC TRƯNG
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
                backgroundColor: "var(--deep-bronze)",
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
            Những món ăn nổi bật tại Madame Lân được lựa chọn để giới thiệu tinh thần ẩm thực Việt: quen thuộc trong hương vị, tinh tế trong cách trình bày và phù hợp cho nhiều dịp dùng bữa.
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
                    color: "var(--deep-bronze)",
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
