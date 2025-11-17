"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";
import { api, StaffMember } from "@/api/api";

export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Define fixed display order
  const positionOrder = ["Chairmen", "Wise Chairmen", "Principle", "Deputy Principle", "Registers", "Lectures"];

  // Normalize backend positions
  const normalizePosition = (pos: string | undefined) => {
    if (!pos) return "Lectures";
    const lower = pos.toLowerCase().trim();

    if (lower.includes("wise chairman")) return "Wise Chairmen";
    if (lower.includes("chairman")) return "Chairmen";
    if (lower.includes("deputy principal") || lower.includes("deputy principle")) return "Deputy Principle";
    if (lower.includes("principal") && !lower.includes("deputy")) return "Principle";
    if (lower.includes("register")) return "Registers";
    if (lower.includes("lecture")) return "Lectures";

    return "Lectures"; // fallback
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await api.getStaff();
        const processed = data.map(staff => ({
          ...staff,
          position: normalizePosition(staff.position),
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">Loading staff...</p>
      </div>
    );
  }

  // Group staff by normalized position
  const groupedStaff: Record<string, StaffMember[]> = {};
  staffMembers.forEach(staff => {
    const pos = staff.position || "Lectures";
    if (!groupedStaff[pos]) groupedStaff[pos] = [];
    groupedStaff[pos].push(staff);
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center text-center bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 text-white py-24">
        <div className="absolute inset-0 bg-[url('/hero-staff.jpg')] bg-cover bg-center opacity-30"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Our Staff
          </h1>
          <p className="mt-3 text-lg md:text-xl max-w-2xl mx-auto text-yellow-100 drop-shadow">
            Meet the passionate educators and professionals driving excellence at AETI.
          </p>
        </motion.div>
      </section>

      {/* Staff Groups */}
      <section className="flex-1 max-w-7xl mx-auto px-6 py-16 space-y-20">
        {positionOrder.map(position => (
          <div key={position}>
            <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              {position}
            </h2>

            {groupedStaff[position]?.length ? (
              <div className="flex flex-wrap justify-center gap-8">
                {groupedStaff[position].map((staff, index) => (
                  <StaffCard staff={staff} key={staff.id} index={index} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 italic">No staff yet in this category.</p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

// Reusable Staff Card Component
function StaffCard({ staff, index }: { staff: StaffMember; index: number }) {
  const links = staff.social_links || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-64 bg-white rounded-3xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 overflow-hidden group relative"
    >
      {/* Image */}
      <div className="relative pt-6 flex justify-center">
        {staff.image ? (
          <img
            src={staff.image}
            alt={staff.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border-4 border-white shadow-lg">
            No Image
          </div>
        )}
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4">
        {links.facebook && (
          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 shadow"
          >
            <FaFacebookF />
          </a>
        )}
        {links.twitter && (
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-400 shadow"
          >
            <FaTwitter />
          </a>
        )}
        {links.linkedin && (
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-700 rounded-full text-white hover:bg-blue-600 shadow"
          >
            <FaLinkedinIn />
          </a>
        )}
      </div>

      {/* Info */}
      <div className="text-center p-6 pt-8 space-y-1">
        <h3 className="text-xl font-semibold text-gray-800">{staff.name}</h3>
        <p className="text-blue-600 font-medium">{staff.role}</p>
        <p className="text-gray-500 text-sm">{staff.department?.name || "N/A"}</p>
        {staff.email && (
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
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
}
