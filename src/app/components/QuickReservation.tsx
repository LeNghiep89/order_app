import { useState } from "react";

export default function QuickReservation() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    area: "",
    phone: ""
  });

  const quickOptions = [
    { label: "Today", value: "today" },
    { label: "Tonight", value: "tonight" },
    { label: "2 Guests", value: "2" },
    { label: "Family", value: "family" },
    { label: "Group", value: "group" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation request:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative -mt-32 z-10">
      <div
        className="mx-auto"
        style={{ maxWidth: "1280px", paddingLeft: "64px", paddingRight: "64px" }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-2xl"
          style={{
            boxShadow: "0 20px 60px rgba(168, 40, 37, 0.12)"
          }}
        >
          {/* Quick Options */}
          <div className="flex flex-wrap gap-2 mb-6">
            {quickOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                className="px-4 py-2 rounded-full text-sm transition-all hover:bg-opacity-90"
                style={{
                  backgroundColor: "var(--ivory)",
                  color: "var(--charcoal)",
                  border: "1px solid var(--border)"
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            {/* Date */}
            <div className="md:col-span-1">
              <label
                htmlFor="date"
                className="block text-sm mb-2"
                style={{ color: "var(--charcoal)" }}
              >
                Ngày
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--input-background)",
                  borderColor: "var(--border)",
                  color: "var(--charcoal)"
                }}
                required
              />
            </div>

            {/* Time */}
            <div className="md:col-span-1">
              <label
                htmlFor="time"
                className="block text-sm mb-2"
                style={{ color: "var(--charcoal)" }}
              >
                Giờ
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--input-background)",
                  borderColor: "var(--border)",
                  color: "var(--charcoal)"
                }}
                required
              />
            </div>

            {/* Guests */}
            <div className="md:col-span-1">
              <label
                htmlFor="guests"
                className="block text-sm mb-2"
                style={{ color: "var(--charcoal)" }}
              >
                Số khách
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--input-background)",
                  borderColor: "var(--border)",
                  color: "var(--charcoal)"
                }}
                required
              >
                <option value="">Chọn</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "người" : "người"}
                  </option>
                ))}
                <option value="10+">10+ người</option>
              </select>
            </div>

            {/* Preferred Area */}
            <div className="md:col-span-1">
              <label
                htmlFor="area"
                className="block text-sm mb-2"
                style={{ color: "var(--charcoal)" }}
              >
                Khu vực
              </label>
              <select
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--input-background)",
                  borderColor: "var(--border)",
                  color: "var(--charcoal)"
                }}
                required
              >
                <option value="">Chọn</option>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
                <option value="private">Private Room</option>
                <option value="no-preference">No Preference</option>
              </select>
            </div>

            {/* Phone */}
            <div className="md:col-span-1">
              <label
                htmlFor="phone"
                className="block text-sm mb-2"
                style={{ color: "var(--charcoal)" }}
              >
                Số điện thoại / Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+84 912 345 678"
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--input-background)",
                  borderColor: "var(--border)",
                  color: "var(--charcoal)"
                }}
                required
              />
            </div>

            {/* CTA */}
            <div className="md:col-span-1">
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg transition-all hover:opacity-90 shadow-md"
                style={{
                  backgroundColor: "var(--brand-red)",
                  color: "var(--warm-white)",
                  fontWeight: "600"
                }}
              >
                Gửi yêu cầu
              </button>
            </div>
          </div>

          {/* Microcopy */}
          <p
            className="mt-4 text-sm text-center"
            style={{ color: "var(--muted-foreground)" }}
          >
            Nhà hàng sẽ liên hệ xác nhận sau khi nhận yêu cầu đặt bàn.
          </p>
        </form>
      </div>
    </div>
  );
}
