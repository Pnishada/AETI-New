import HeroSection from "@/components/HeroSection";
import AboutSection from "../components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import CoursesPreview from "@/components/CoursesPreview";


export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <AboutSection />
        <CoursesPreview/>
        <WhyChooseSection />
      </main>
    </div>
  );
}
