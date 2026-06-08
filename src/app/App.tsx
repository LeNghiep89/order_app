import Header from "./components/Header";
import Hero from "./components/Hero";
import QuickReservation from "./components/QuickReservation";
import WhyChoose from "./components/WhyChoose";
import BrandStory from "./components/BrandStory";
import DiningExperience from "./components/DiningExperience";
import FeaturedDishes from "./components/FeaturedDishes";
import PrivateDining from "./components/PrivateDining";
import ReviewsTrust from "./components/ReviewsTrust";
import LocationContact from "./components/LocationContact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--warm-white)" }}>
      <Header />
      <Hero />
      <QuickReservation />
      <WhyChoose />
      <BrandStory />
      <DiningExperience />
      <FeaturedDishes />
      <PrivateDining />
      <ReviewsTrust />
      <LocationContact />
      <Footer />
    </div>
  );
}