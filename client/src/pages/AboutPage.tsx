import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Building2, Award, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AboutPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const courses = [
    "Automobile Mechanic",
    "Automobile Electrician",
    "Automobile Machinist",
    "Automobile A/C Mechanic",
    "Automobile Tinker",
    "Automobile Painter",
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-red-600 via-red-300 to-red-200">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-6 py-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Discover <span className="text-gray-50">AETI</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-white leading-relaxed">
            The Automobile Engineering Training Institute (AETI) is a national-level
            Training Institute for automobile engineering, established by grant aid
            from the Government of Japan at a cost of LKR 500 million. The Institute
            was ceremonially declared open on 28th October 1989. AETI functions under
            the National Apprentice & Industrial Training Authority (NAITA) of the Ministry
            of Education, Higher Education and Vocational Education.
          </p>
        </motion.div>

        {/* Right: Image Slider */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 4000 }}
            loop
            className="rounded-2xl shadow-lg"
          >
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
                alt="Training"
                className="rounded-2xl w-full h-64 md:h-80 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                alt="Students"
                className="rounded-2xl w-full h-64 md:h-80 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1000&q=80"
                alt="Industry"
                className="rounded-2xl w-full h-64 md:h-80 object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Key aspects of AETI (Japan Tech):
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Training courses are conducted in 06 streams with approximately 600
            students (morning & evening batches):
          </p>

          {/* Interactive Courses List */}
          <ul className="text-left mt-6 space-y-2 max-w-md mx-auto">
            {courses.map((course, index) => (
              <li
                key={index}
                onClick={() => setSelected(course)}
                className={`cursor-pointer transition ${
                  selected === course
                    ? "font-bold text-blue-700"
                    : "hover:font-bold"
                }`}
              >
                • {course}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-gray-600 leading-relaxed max-w-3xl mx-auto">
            All automotive courses are formulated in consultation with industry to ensure trainees
            meet skilled manpower requirements. OJT is provided for students completing institutional
            training. Employment rate is nearly 100%. Skill upgrading and career advancement opportunities
            are also provided.
          </p>
          <p className="mt-2 text-gray-600 leading-relaxed max-w-3xl mx-auto">
            The institute was relocated to its new premises due to New Kelani Bridge project in 2017,
            with assistance from JICA at a cost of over LKR 1500 million.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-200 text-black py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Mission Card */}
          <Card className="relative overflow-hidden shadow-2xl rounded-2xl hover:shadow-3xl transition-shadow duration-500 transform hover:-translate-y-2 hover:scale-105 bg-gradient-to-r from-red-700 to-white text-black">
            <div className="absolute inset-0 bg-gradient-to-tr from-white to-red-700 opacity-20 animate-pulse"></div>
            <CardContent className="relative z-10 p-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-black leading-relaxed">
                To be an institution of excellence in providing training in automobile
                and related trades to meet industry needs. To be recognised as the leading 
                and reputable provider of high-quality training and professional consultancy 
                services that make a significant contribution to the African economy.
              </p>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="relative overflow-hidden shadow-2xl rounded-2xl hover:shadow-3xl transition-shadow duration-500 transform hover:-translate-y-2 hover:scale-105 bg-gradient-to-r from-red-700 to-white text-black">
            <div className="absolute inset-0 bg-gradient-to-tr from-white to-red-700 opacity-20 animate-pulse"></div>
            <CardContent className="relative z-10 p-6">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-black leading-relaxed">
                To be a leading training provider in Automobile Engineering within Asia. 
                To be recognised as the leading and reputable provider of high-quality 
                training and professional consultancy services that make a significant 
                contribution to the African economy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose AETI */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose AETI</h2>
          <p className="mt-4 text-gray-600">
            We provide government-certified training, industry partnerships, and overseas scholarships.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: Building2, title: "Govt. Certified Training" },
              { icon: Award, title: "Industry Partnerships" },
              { icon: Users, title: "Overseas scholarships" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 p-8 rounded-2xl shadow-md flex flex-col items-center"
              >
                <item.icon className="w-12 h-12 text-red-700" />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
