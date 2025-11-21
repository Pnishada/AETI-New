"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import CourseCard from "@/components/CourseCard";
import EnrollFormDialog from "@/components/EnrollFormDialog";
import CourseDetailsDialog from "@/components/CoursesDetailsDialog";
import { Course, api } from "@/api/api"; 


export default function CoursesPage() {
  const [location, setLocation] = useLocation();
  const coursesRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"All" | "Full-Time" | "Part-Time">("All");
  const [search, setSearch] = useState("");
  const [durationFilter, setDurationFilter] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollCourse, setEnrollCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.split("?")[1]);
    const typeParam = queryParams.get("type");

    if (typeParam === "Full-Time" || typeParam === "Part-Time") {
      setActiveTab(typeParam);
      setTimeout(() => {
        coursesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      setActiveTab("All");
    }
  }, [location]);

  // Filter courses based on activeTab, search, and duration
  const displayedCourses = useMemo(() => {
    let filtered =
      activeTab === "All"
        ? courses
        : courses.filter((c) => c.description?.includes(activeTab));

    if (search.trim()) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (durationFilter !== "All") {
      filtered = filtered.filter((c) => c.duration === durationFilter);
    }

    return filtered;
  }, [activeTab, search, durationFilter, courses]);

  //  Available durations
  const availableDurations = useMemo(() => {
    const filteredCourses =
      activeTab === "All"
        ? courses
        : courses.filter((c) => c.description?.includes(activeTab));

    return ["All", ...Array.from(new Set(filteredCourses.map((c) => c.duration)))];
  }, [activeTab, courses]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-8">
        {activeTab === "All" ? "All Courses" : `${activeTab} Courses`}
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        {["All", "Full-Time", "Part-Time"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab as "All" | "Full-Time" | "Part-Time");
              setDurationFilter("All");
              setLocation(`/courses?type=${tab}`);
              setTimeout(() => {
                coursesRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 200);
            }}
            className={`px-6 py-2 font-semibold rounded-lg transition mx-2 ${
              activeTab === tab
                ? "bg-blue-700 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
        <div className="w-full sm:w-auto">
          <label htmlFor="durationFilter" className="sr-only">
            Filter by duration
          </label>
          <select
            id="durationFilter"
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none w-full sm:w-auto"
          >
            {availableDurations.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "All Durations" : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/*  Courses Grid */}
      <div ref={coursesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewDetails={setSelectedCourse}
          />
        ))}
      </div>

      {/* Dialogs */}
      <CourseDetailsDialog
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={(c) => {
          setSelectedCourse(null);
          setEnrollCourse(c);
        }}
      />
      {enrollCourse && (
        <EnrollFormDialog
          courseTitle={enrollCourse.name}
          open={!!enrollCourse}
          onClose={() => setEnrollCourse(null)}
        />
      )}
    </section>
  );
}
