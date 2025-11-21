"use client";

import { useEffect, useState } from "react";
import { Course, api, Department } from "@/api/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface Props {
  courseId: number | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export default function CourseDetailsDialog({ courseId, onClose, onEnroll }: Props) {
  const [course, setCourse] = useState<Course | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const courseData = await api.getCourseById(courseId);
        setCourse(courseData);

        if (courseData.department?.id) {
          const deptData = await api.getDepartmentById(courseData.department.id);
          setDepartment(deptData);
        }
      } catch (err) {
        console.error("Failed to fetch course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!courseId) return null;

  const imageUrl = course?.image
    ? course.image.startsWith("http")
      ? course.image
      : `http://127.0.0.1:8000${course.image}`
    : "/default-course.jpg";

  return (
    <Dialog open={!!courseId} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden rounded-2xl shadow-xl">
        {/* Image & Close Button */}
        <div className="relative w-full h-64 sm:h-72">
          <img
            src={imageUrl}
            alt={course?.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Course Info */}
        <div className="p-6 space-y-5 bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">{course?.title}</DialogTitle>
            <DialogDescription className="text-gray-600 mt-1 flex flex-wrap gap-2 text-sm">
              <span className="font-medium">{course?.type}</span> 
              <span>Duration: {course?.duration}</span>
              {course?.fee && <span>Fee: ${course.fee}</span>}
              {course?.method && <span>Method: {course.method}</span>}
            </DialogDescription>
          </DialogHeader>

          {/* Department Info */}
          {department && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900">{department.name}</h3>
              {department.head && <p className="text-blue-700 mt-1">Head: {department.head}</p>}
              {department.description && (
                <p className="text-blue-800 mt-2 text-sm">{department.description}</p>
              )}
            </div>
          )}

          {/* Course Description */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Course Description</h4>
            <p className="text-gray-700 mt-2">{course?.description}</p>
          </div>

          {/* Enroll Button */}
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => course && onEnroll(course)}
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
