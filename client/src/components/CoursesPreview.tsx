"use client";

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { api, Course } from "@/api/api";
import EnrollFormDialog from "@/components/EnrollFormDialog";
import CourseDetailsDialog from "@/components/CoursesDetailsDialog";

export default function CoursesPreview() {
  const [, setLocation] = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollCourse, setEnrollCourse] = useState<Course | null>(null);

  // Fetch courses
  useEffect(() => {
    setLoading(true);
    api
      .getCourses()
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Ensure courses have valid names
  const validCourses = courses.filter((c) => c && typeof c.name === "string");

  // Filter types safely
  const fullTime = validCourses
    .filter((c) => c.name.toLowerCase().includes("full"))
    .slice(0, 2);

  const partTime = validCourses
    .filter((c) => c.name.toLowerCase().includes("part"))
    .slice(0, 2);

  const goToCourses = (type: "Full-Time" | "Part-Time") => {
    setLocation(`/courses?type=${type}`);
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-red-900 mb-4">
            Explore Our Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully designed{" "}
            <strong>Full-Time</strong> and <strong>Part-Time</strong> programs. 
            Learn practical skills guided by industry experts.
          </p>
        </div>

        {/* Loading or Error */}
        {loading && (
          <p className="text-center text-gray-500 text-lg">Loading courses...</p>
        )}
        {error && <p className="text-center text-red-600 text-lg">{error}</p>}

        {/* Category Cards */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Full-Time */}
            <div
              className="relative bg-white rounded-3xl shadow-lg border border-gray-200 p-8 cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
              onClick={() => goToCourses("Full-Time")}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-red-50 via-transparent opacity-0 group-hover:opacity-30 transition-opacity rounded-3xl"></div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold text-red-800 mb-4">
                    Full-Time Courses
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explore our professional full-time courses with hands-on training and industry exposure.
                  </p>
                  <div className="flex gap-4">
                    {fullTime.length > 0 ? (
                      fullTime.map((course) => (
                        <div
                          key={course.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCourse(course);
                          }}
                          className="relative w-24 h-24 rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 hover:scale-110"
                        >
                          <img
                            src={
                              course.image
                                ? course.image.startsWith("http")
                                  ? course.image
                                  : `http://127.0.0.1:8000${course.image}`
                                : "/default-course.jpg"
                            }
                            alt={course.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-sm">
                            {course.name}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No full-time courses available.</p>
                    )}
                  </div>
                </div>
                <div className="mt-6 text-red-700 font-semibold hover:underline">
                  See All Full-Time Courses →
                </div>
              </div>
            </div>

            {/* Part-Time */}
            <div
              className="relative bg-white rounded-3xl shadow-lg border border-gray-200 p-8 cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
              onClick={() => goToCourses("Part-Time")}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-red-50 via-transparent opacity-0 group-hover:opacity-30 transition-opacity rounded-3xl"></div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold text-red-800 mb-4">
                    Part-Time Courses
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explore our part-time programs designed for working professionals and evening/weekend learners.
                  </p>
                  <div className="flex gap-4">
                    {partTime.length > 0 ? (
                      partTime.map((course) => (
                        <div
                          key={course.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCourse(course);
                          }}
                          className="relative w-24 h-24 rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 hover:scale-110"
                        >
                          <img
                            src={
                              course.image
                                ? course.image.startsWith("http")
                                  ? course.image
                                  : `http://127.0.0.1:8000${course.image}`
                                : "/default-course.jpg"
                            }
                            alt={course.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-sm">
                            {course.name}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No part-time courses available.</p>
                    )}
                  </div>
                </div>
                <div className="mt-6 text-red-700 font-semibold hover:underline">
                  See All Part-Time Courses →
                </div>
              </div>
            </div>
          </div>
        )}
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
