import { useEffect, useRef, useState } from "react";
import {
  Hammer,
  Bolt,
  Wrench,
  Snowflake,
  Paintbrush,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "./Footer";
import Header from "./Header";

export default function CoursesSection() {
  // === Course Data ===
  const courses = [
    // ==== Full-Time Courses ====
    {
      id: "Automobile Mechanic",
      icon: Hammer,
      title: "Automobile Mechanic (AM)",
      image: "/src/components/assets/Automobile Mechanic.jpg",
      description:
        "Learn practical and theoretical aspects of modern automobile mechanics with hands-on training.",
      fee: "200,000",
      duration: "3 years",
      method: "1 year Institutional; 2 years Industrial",
      type: "Full-Time",
    },
    {
      id: "Automobile Electrician",
      icon: Bolt,
      title: "Automobile Electrician (AE)",
      image: "/src/components/assets/Automobile Electrician.jpg",
      description:
        "Specialize in automobile electrical systems, diagnostics, and maintenance.",
      fee: "200,000",
      duration: "3 years",
      method: "1 year Institutional; 2 years Industrial",
      type: "Full-Time",
    },
    {
      id: "Machinist",
      icon: Wrench,
      title: "Machinist (MC)",
      image: "/src/components/assets/Automobile Machinist.jpg",
      description:
        "Develop machining and repair skills for automobile components and parts.",
      fee: "170,000",
      duration: "3 years",
      method: "1 year Institutional; 2 years Industrial",
      type: "Full-Time",
    },
    {
      id: "Automobile Air Condition Mechanic",
      icon: Snowflake,
      title: "Automobile A/C Mechanic (A/C)",
      image: "/src/components/assets/Automobile Air Condition Mechanic.jpg",
      description:
        "Master automobile A/C repair, installation, and troubleshooting techniques.",
      fee: "180,000",
      duration: "2 years",
      method: "1 year Institutional; 1 year Industrial",
      type: "Full-Time",
    },
    {
      id: "Automobile Painter",
      icon: Paintbrush,
      title: "Automobile Painter",
      image: "/src/components/assets/Automobile Painter.jpg",
      description: "Learn professional automobile painting and finishing skills.",
      fee: "150,000",
      duration: "2 years",
      method: "1 year Institutional; 1 year Industrial",
      type: "Full-Time",
    },
    {
      id: "Automobile Tinker",
      icon: Car,
      title: "Automobile Tinker",
      image: "/src/components/assets/Automobile Tinker.jpg",
      description: "Comprehensive training covering practical automobile body work.",
      fee: "150,000",
      duration: "2 years",
      method: "1 year Institutional; 1 year Industrial",
      type: "Full-Time",
    },

    // ==== Part-Time Courses ====
    {
      id: "Auto Mechanical Part I",
      icon: Hammer,
      title: "Auto Mechanical Part I (Engine Mechanism)",
      image: "/src/components/assets/Auto Mechanical Part I (Engine Mechanism).jpg",
      description: "Covers fundamental engine mechanism training.",
      fee: "60,000",
      duration: "6 months",
      method: "Evening / Weekend Classes",
      type: "Part-Time",
    },
    {
      id: "Auto Mechanical Part II",
      icon: Wrench,
      title: "Auto Mechanical Part II (Chassis Mechanism)",
      image: "/src/components/assets/Auto Mechanical Part II (Chassis Mechanism).jpg",
      description: "Focuses on chassis mechanism and repair training.",
      fee: "65,000",
      duration: "6 months",
      method: "Evening / Weekend Classes",
      type: "Part-Time",
    },
    {
      id: "Auto Mechanical Part III",
      icon: Bolt,
      title: "Auto Mechanical Part III (Advance Course)",
      image: "/src/components/assets/Auto Mechanical Part III (Advance Course).jpg",
      description: "Advanced automobile mechanical training for professionals.",
      fee: "70,000",
      duration: "6 months",
      method: "Evening / Weekend Classes",
      type: "Part-Time",
    },
    {
      id: "Modern Technology",
      icon: Car,
      title: "Modern Technology",
      image: "/src/components/assets/Modern Technology.jpg",
      description: "Learn about modern automobile technology and innovations.",
      fee: "75,000",
      duration: "6 months",
      method: "Evening / Weekend Classes",
      type: "Part-Time",
    },
    {
      id: "Engine Tune-Up",
      icon: Wrench,
      title: "Engine Tune-Up",
      image: "/src/components/assets/Engine Tune-Up.jpg",
      description: "Practical training for engine tune-up and efficiency improvement.",
      fee: "40,000",
      duration: "3 months",
      method: "Weekend Classes",
      type: "Part-Time",
    },
    {
      id: "EFI Systems",
      icon: Bolt,
      title: "EFI Systems",
      image: "/src/components/assets/EFI Systems.jpg",
      description: "Specialized training in Electronic Fuel Injection systems.",
      fee: "45,000",
      duration: "3 months",
      method: "Weekend Classes",
      type: "Part-Time",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    course: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [activeTab, setActiveTab] = useState<"Full-Time" | "Part-Time">(
    "Full-Time"
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleIndexes((prev) => [
              ...prev.filter((i) => i !== index),
              index,
            ]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const children = containerRef.current?.children;
    if (children) Array.from(children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted ✅", formData);
    setFormData({ course: "", name: "", email: "", phone: "", message: "" });
    setIsFormOpen(false);
  };

  return (

    <section className="bg-white py-16 lg:py-24" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-900 mb-4">
            Courses & Training Categories
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Choose from Full-Time or Part-Time courses tailored to your career
            goals.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setActiveTab("Full-Time")}
            className={`px-6 py-2 rounded-l-lg font-semibold transition ${
              activeTab === "Full-Time"
                ? "bg-blue-700 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Full-Time
          </button>
          <button
            onClick={() => setActiveTab("Part-Time")}
            className={`px-6 py-2 rounded-r-lg font-semibold transition ${
              activeTab === "Part-Time"
                ? "bg-blue-700 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Part-Time
          </button>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          ref={containerRef}
        >
          {courses
            .filter((c) => c.type === activeTab)
            .map((course, index) => {
              const IconComponent = course.icon;
              const isVisible = visibleIndexes.includes(index);
              return (
                <div
                  key={index}
                  data-index={index}
                  className={`bg-white rounded-3xl p-8 text-center shadow-md border border-gray-200 transition-all transform duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  } hover:-translate-y-3 hover:shadow-2xl`}
                >
                  <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300 animate-bounce-slow">
                    <IconComponent className="text-blue-800 w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-blue-800 mb-4 text-lg hover:text-blue-900 transition-colors">
                    {course.title}
                  </h3>
                  <Button
                    variant="link"
                    className="text-blue-800 hover:text-blue-900 font-medium transition-colors p-0"
                    onClick={() => {
                      setSelectedCourse(course);
                      setFormData((prev) => ({ ...prev, course: course.title }));
                    }}
                  >
                    View Details
                  </Button>
                </div>
              );
            })}
        </div>
      </div>

      {/* Course Details Popup */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden rounded-3xl shadow-xl">
          {selectedCourse && (
            <>
              <div className="relative h-64 sm:h-80 w-full">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-t-3xl" />
                <div className="absolute bottom-6 left-6 flex flex-col gap-2 text-white">
                  <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    {/* Fixed icon rendering */}
                    <selectedCourse.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 max-w-xs">
                    {selectedCourse.description}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <th className="py-2 px-4 font-medium">Fee (Rs.)</th>
                      <td className="py-2 px-4">{selectedCourse.fee}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-2 px-4 font-medium">Duration</th>
                      <td className="py-2 px-4">{selectedCourse.duration}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-2 px-4 font-medium">Training Method</th>
                      <td className="py-2 px-4">{selectedCourse.method}</td>
                    </tr>
                  </tbody>
                </table>

                <DialogFooter className="pt-4">
                  <Button
                    onClick={() => {
                      setIsFormOpen(true);
                      setSelectedCourse(null);
                    }}
                    className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-6 py-2 shadow-md hover:shadow-lg transition"
                  >
                    Enroll Now
                  </Button>
                </DialogFooter>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Enroll Form Popup */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Enroll Now</DialogTitle>
            <DialogDescription>
              Fill in your details and we’ll contact you soon.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                value={formData.course}
                readOnly
                className="bg-gray-100 font-semibold"
              />
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any specific requests?"
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                Submit Application
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </section>

  );
}