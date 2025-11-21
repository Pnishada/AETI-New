import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Building Image */}
          <div className="order-2 lg:order-1">
            <img
              src="src/components/assets/AETI.jpg"
              alt="Modern IETI office building"
              className="rounded-xl shadow-2xl   w-full h-auto object-cover"
              data-testid="img-about-building"
            />
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2
              className="text-3xl lg:text-4xl font-extrabold text-blue-800 tracking-tight"
              data-testid="text-about-title"
            >
              Discover AETI
            </h2>
            <p
              className="text-lg text-slate-700 leading-relaxed"
              data-testid="text-about-description"
            >
              The Automobile Engineering Training Institute (AETI) is a national-level training institute for automobile engineering, 
              established in 1989 with Japanese government assistance (LKR 500 million). 
              It functions under the National Apprentice & Industrial Training Authority (NAITA), Ministry of Education, Higher Education & Vocational Education.

In 2017, AETI was relocated with the support of Japan International Co-operation Agency (JICA) at a cost of LKR 1500 million.
              <br />
              <br />
             
            </p>

            <Link href="/about">
              <Button
                className="bg-blue-700 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-colors"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}