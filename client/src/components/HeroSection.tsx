"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import { Button } from "@/components/ui/button";
import Automobile_Electrician from "@/components/assets/Automobile Electrician.jpg";
import Automobile_Machinist from "@/components/assets/Automobile Machinist.jpg";
import Automobile_Mechanic from "@/components/assets/Automobile Mechanic.jpg";
import Automobile_Painter from "@/components/assets/Automobile Painter.jpg";
import ApplyForm from "./ui/applyonlineForm";

export default function HeroSlider() {
  const [showForm, setShowForm] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; opacity: number; delay: number }[]>([]);

  const slides = [
    Automobile_Electrician,
    Automobile_Machinist,
    Automobile_Mechanic,
    Automobile_Painter,
  ];

  // Generate particles
  useEffect(() => {
    const arr = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100, // percentage for left
      y: Math.random() * 70, // percentage for top
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 3,
    }));
    setParticles(arr);
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="absolute inset-0 w-full h-full"
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-full relative bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }} // dynamic URL is okay inline
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-float"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Overlay Text */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-[70vh]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight animate-fade-in">
          Founded for <span className="text-red-500">Skill</span>. <br /> Built for{" "}
          <span className="text-red-500">Industry</span>.
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-200 max-w-3xl drop-shadow-md animate-fade-in delay-200">
          Automobile Engineering Training Institute (AETI) – Hands-on training for
          future-ready professionals.
        </p>

        {/* Glassmorphism Apply Button */}
        <Button
          onClick={() => setShowForm(true)}
          className="mt-6 px-10 md:px-12 py-3 md:py-3 text-lg md:text-xl font-semibold rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg transition-all duration-300
                     hover:bg-white/30 hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          Apply Online
        </Button>
      </div>

      {/* Apply Form Modal */}
      {showForm && <ApplyForm onClose={() => setShowForm(false)} />}

      {/* Tailwind Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s forwards;
        }
        .animate-fade-in.delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
}
