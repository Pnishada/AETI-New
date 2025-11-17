"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";

// Import the logo
import logoImg from "./assets/AETI_Logo.png"; 

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const navLinks = [
    { name: "Home", route: "/" },
    { name: "Discover AETI", route: "/about" },
    { name: "Courses", route: "/courses" },
    { name: "Gallery", route: "/gallery" },
    { name: "LMS", route: "/lms" },
    { name: "Contact Us", route: "/contact" },
    { name: "Staff", route: "/staff" },
    { name: "Downloads", route: "/download" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-shadow overflow-hidden">
              <img src={logoImg} alt="AETI Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold tracking-wide font-sans">AETI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.route}
                className="hover:text-yellow-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-64 rounded-lg bg-white text-black placeholder-gray-500"
            />
            <Button type="submit" size="icon" className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg">
              <Search className="w-5 h-5" />
            </Button>
          </form>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-white">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#7b1e1e] to-[#5a0f0f] px-4 pt-2 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.route}
                className="text-white hover:text-yellow-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="flex items-center space-x-2 pt-4">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-white text-black placeholder-gray-500"
            />
            <Button type="submit" size="icon" className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg">
              <Search className="w-5 h-5" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
