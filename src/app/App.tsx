import Header from "./components/Header";
import Hero from "./components/Hero";
import QuickReservation from "./components/QuickReservation";
import BrandStory from "./components/BrandStory";
import DiningExperience from "./components/DiningExperience";
import FeaturedDishes from "./components/FeaturedDishes";
import PrivateDining from "./components/PrivateDining";
import ReviewsTrust from "./components/ReviewsTrust";

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--warm-white)" }}>
      <Header />
      <Hero />
      <QuickReservation />
      <BrandStory />
      <DiningExperience />
      <FeaturedDishes />
      <PrivateDining />
      <ReviewsTrust />

      {/* Footer placeholder */}
      <div className="h-[200px]" />
    </div>
  );
}