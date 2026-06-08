export default function WhyChoose() {
  const reasons = [
    {
      icon: "cuisine",
      title: "Authentic Central Vietnam Cuisine",
      description: "Traditional recipes and flavors from Central Vietnam, prepared with care and authenticity."
    },
    {
      icon: "location",
      title: "Riverside Da Nang Location",
      description: "Prime location with beautiful views and easy access for both locals and tourists."
    },
    {
      icon: "family",
      title: "Premium Family Dining Atmosphere",
      description: "Spacious, warm environment perfect for family gatherings and celebrations."
    },
    {
      icon: "tourists",
      title: "Welcome International Guests",
      description: "English-speaking staff and menu options suitable for tourists and groups."
    },
    {
      icon: "space",
      title: "Large Dining Space",
      description: "Accommodating groups, events, and special occasions with flexible seating arrangements."
    },
    {
      icon: "hospitality",
      title: "Vietnamese Hospitality",
      description: "Warm, attentive service rooted in traditional Vietnamese hospitality values."
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
            WHY CHOOSE MADAME LÂN
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
            Your Destination for Authentic Vietnamese Dining
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "var(--muted-foreground)"
            }}
          >
            From families seeking authentic Vietnamese flavors to tourists exploring Da Nang's culinary scene, Madame Lân offers a memorable dining experience.
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
                  {reason.icon === "tourists" && (
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM3.6 9h16.8M3.6 15h16.8M12 3a17 17 0 0 1 0 18M12 3a17 17 0 0 0 0 18" />
                  )}
                  {reason.icon === "space" && (
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" />
                  )}
                  {reason.icon === "hospitality" && (
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
