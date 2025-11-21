"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { api, StaffMember } from "@/api/api";

export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activePosition, setActivePosition] = useState<string>("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await api.getStaff();
        const processed = data.map((staff: StaffMember) => ({
          ...staff,
          position: staff.position || "Staff",
        }));
        setStaffMembers(processed);
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePosition(entry.target.getAttribute("data-position") || "");
          }
        }),
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    Object.values(groupRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [staffMembers]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <p className="text-gray-700 text-lg">Loading staff...</p>
      </div>
    );
  }

  if (!staffMembers.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <p className="text-gray-700 text-lg">No staff members found.</p>
      </div>
    );
  }

  const grouped: Record<string, StaffMember[]> = {};
  staffMembers.forEach((s) => {
    const p = s.position || "Staff";
    if (!grouped[p]) grouped[p] = [];
    grouped[p].push(s);
  });

  const order = [
    "Chairman",
    "Vice Chairman",
    "Director General",
    "Assistant Director",
    "Registrar",
    "Head of Department",
    "Senior Lecturer",
    "Lecturer",
    "Instructor",
    "Staff",
  ];

  const badgeColors: Record<string, string> = {
    Chairman: "from-blue-900 to-blue-700",
    "Vice Chairman": "from-blue-800 to-blue-600",
    "Director General": "from-blue-700 to-blue-500",
    "Assistant Director": "from-blue-700 to-blue-500",
    Registrar: "from-blue-600 to-blue-400",
    "Head of Department": "from-blue-600 to-blue-400",
    "Senior Lecturer": "from-blue-500 to-blue-300",
    Lecturer: "from-blue-500 to-blue-300",
    Instructor: "from-blue-400 to-blue-300",
    Staff: "from-blue-400 to-blue-300",
  };

  const scrollToGroup = (position: string) =>
    groupRefs.current[position]?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-72 md:h-96 flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-[url('/hero-staff.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-300 to-blue-700"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg tracking-tight">
            Our Staff
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-blue-100">
            Meet the professionals dedicated to excellence at AETI.
          </p>
        </motion.div>
      </section>

      {/* Horizontal Tab Bar */}
      <div className="sticky top-0 z-20 bg-gray-50 shadow-sm overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 py-3">
          {order.map((position) =>
            grouped[position]?.length ? (
              <motion.button
                key={position}
                onClick={() => scrollToGroup(position)}
                whileHover={{ scale: 1.05 }}
                className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold transition shadow-md ${
                  activePosition === position
                    ? `bg-gradient-to-r ${badgeColors[position]} text-white`
                    : "bg-white text-blue-800 border border-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {position}
              </motion.button>
            ) : null
          )}
        </div>
      </div>

      {/* Staff Groups */}
      <section className="flex-1 max-w-7xl mx-auto px-6 py-16 space-y-24">
        {order.map((position) =>
          grouped[position]?.length ? (
            <div
              key={position}
              ref={(el) => (groupRefs.current[position] = el)}
              data-position={position}
            >
              <div className="flex justify-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`px-8 py-3 rounded-3xl font-bold text-2xl text-white shadow-xl bg-gradient-to-r ${badgeColors[position]} hover:scale-105 transition`}
                >
                  {position}
                </motion.div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {grouped[position].map((staff, i) => {
                  const links = staff.social_links || {};

                  return (
                    <motion.div
                      key={staff.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-white rounded-3xl relative shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                    >
                      <div className="relative pt-8 pb-4 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg overflow-hidden">
                          {staff.image ? (
                            <img
                              src={staff.image}
                              alt={staff.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>

                        {/* Social Icons - With ARIA Labels */}
                        <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition">
                          {links.facebook && (
                            <a
                              href={links.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${staff.name} Facebook profile`}
                              className="p-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-500"
                            >
                              <FaFacebookF />
                            </a>
                          )}

                          {links.twitter && (
                            <a
                              href={links.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${staff.name} Twitter profile`}
                              className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-400"
                            >
                              <FaTwitter />
                            </a>
                          )}

                          {links.linkedin && (
                            <a
                              href={links.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${staff.name} LinkedIn profile`}
                              className="p-2 bg-blue-700 text-white rounded-full shadow hover:bg-blue-600"
                            >
                              <FaLinkedinIn />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="text-center px-6 pb-8 space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {staff.name}
                        </h3>

                        <div className="flex justify-center">
                          <span className="px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-700 font-semibold border border-blue-200">
                            {staff.position}
                          </span>
                        </div>

                        <p className="text-gray-500 text-sm">
                          {staff.department?.name || "Department"}
                        </p>

                        {staff.email && (
                          <p className="text-gray-600 text-sm flex items-center justify-center gap-2 mt-2">
                            <FaEnvelope /> {staff.email}
                          </p>
                        )}

                        {staff.phone && (
                          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                            <FaPhone /> {staff.phone}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : null
        )}
      </section>
    </div>
  );
}
