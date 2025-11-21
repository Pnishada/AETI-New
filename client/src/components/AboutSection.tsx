import AboutSection from "./HomeAboutWithNews";
import NewsHighlight from "./NewsHighlight";

export default function HomeAboutWithNews() {
  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10 items-start">
          <AboutSection />
          <NewsHighlight />
        </div>

      </div>
    </div>
  );
}
