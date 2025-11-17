import { CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NewsSection() {
  return (
    <section className="bg-gray-50 py-20" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-700 tracking-tight">
            Latest News & Announcements
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Stay updated with the newest programs, events, and announcements from AETI.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* News 1 */}
          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
              alt="Training Session"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center text-sm text-blue-600 font-medium mb-3">
                <CalendarDays className="w-4 h-4 mr-1" />
                September 10, 2025
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                AETI Introduces Advanced Hybrid Vehicle Training Program
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                With the rapid adoption of hybrid and electric vehicles, AETI is proud
                to launch specialized courses to prepare the next generation of
                automobile engineers.
              </p>
              <Link href="/news/1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-4 text-blue-700 hover:text-blue-800 hover:bg-red-50 flex items-center"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* News 2 */}
          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
              alt="Mobile Application"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center text-sm text-blue-600 font-medium mb-3">
                <CalendarDays className="w-4 h-4 mr-1" />
                September 05, 2025
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Launch of AETI Mobile Application
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The brand-new AETI Mobile App lets students explore programs,
                apply online, and receive updates on the go. Available now on Android
                and iOS platforms.
              </p>
              <Link href="/news/2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-4 text-blue-700 hover:text-blue-800 hover:bg-red-50 flex items-center"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* More Button */}
        <div className="text-center mt-14">
          <Link href="/news">
            <Button className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 rounded-lg font-medium shadow">
              More News & Announcements
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
