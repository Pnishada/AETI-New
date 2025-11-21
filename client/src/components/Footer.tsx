"use client";

import { Link } from "wouter";
import { GraduationCap, Phone, Mail, MapPin, Printer, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [open, setOpen] = useState(false);

  const linkHover = {
    whileHover: { scale: 1.05, color: "#ffffff" },
    whileTap: { scale: 0.95 },
  };

  return (
    <footer className="bg-blue-800 text-white w-full py-6">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">

          {/* Logo & Description */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
                <GraduationCap className="text-blue-800 w-4 h-4" />
              </div>
              <span className="text-lg font-bold">AETI</span>
            </div>
            <p className="text-xs leading-relaxed text-blue-100">
              Excellence in training for automobile and related trades.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">Quick Links</h4>
            <ul className="space-y-1 text-xs text-blue-200">
              <motion.li {...linkHover}><Link href="/">Home</Link></motion.li>
              <motion.li {...linkHover}><Link href="/about">Discover AETI</Link></motion.li>

              {/* Collapsible Courses */}
              <li>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center space-x-1 focus:outline-none text-blue-200 hover:text-white text-xs"
                >
                  <span>Courses</span>
                  <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-3 h-3 opacity-70" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-3 mt-1 space-y-1 text-blue-100 text-[10px] overflow-hidden"
                    >
                      <li><Link href="/courses?type=Full-Time">Full-Time</Link></li>
                      <li><Link href="/courses?type=Part-Time">Part-Time</Link></li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <motion.li {...linkHover}><Link href="/download">Downloads</Link></motion.li>
              <motion.li {...linkHover}><Link href="/gallery">Gallery</Link></motion.li>
              <motion.li {...linkHover}><Link href="/lms">LMS</Link></motion.li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">Services</h4>
            <ul className="space-y-1 text-xs text-blue-200">
              <motion.li {...linkHover}><Link href="/courses">Training Programs</Link></motion.li>
              <motion.li {...linkHover}><Link href="/download">Student Resources</Link></motion.li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">Contact</h4>
            <ul className="space-y-1 text-xs text-blue-200">
              <motion.li {...linkHover} className="flex items-start">
                <MapPin className="w-3 h-3 mr-1 mt-1" />
                <a
                  href="https://maps.app.goo.gl/jK8RepHHaRVSaRJGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline"
                >
                  Automobile Engineering Training Institute <br />
                  69/A, Baseline Road, Orugodawatta
                </a>
              </motion.li>
              <motion.li {...linkHover} className="flex items-start">
                <Phone className="w-3 h-3 mr-1 mt-1" />
                <a href="tel:+94112244333">+94 11 224 4333</a>
              </motion.li>
              <motion.li {...linkHover} className="flex items-start">
                <Mail className="w-3 h-3 mr-1 mt-1" />
                <a href="mailto:info@aeti.lk">info@aeti.lk</a>
              </motion.li>
              <motion.li {...linkHover} className="flex items-start">
                <Printer className="w-3 h-3 mr-1 mt-1" />
                <a href="fax:+94112244333">+94 11 224 4333</a>
              </motion.li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-6 border-t border-blue-700 pt-3 text-center text-[10px] text-blue-200 space-y-1">
          <div>&copy; {new Date().getFullYear()} AETI. All rights reserved.</div>
          <div>Powered by NAITA.</div>
        </div>
      </div>
    </footer>
  );
}
