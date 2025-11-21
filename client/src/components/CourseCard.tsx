import { Button } from "@/components/ui/button";
import { Course } from "@/api/api";

interface Props {
  course: Course;
  onViewDetails?: (course: Course) => void;
}

export default function CourseCard({ course, onViewDetails }: Props) {
  const imageUrl = course.image
    ? course.image.startsWith("http")
      ? course.image
      : `http://127.0.0.1:8000${course.image}`
    : "/default-course.jpg";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-200 transition transform hover:-translate-y-2">
      {/* Image */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={course.title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{course.description}</p>

        <div className="text-sm text-gray-500 mb-4 space-y-1">
          <p>Type: {course.type}</p>
          <p>Duration: {course.duration}</p>
          {course.fee && <p>Fee: ${course.fee}</p>}
          {course.method && <p>Method: {course.method}</p>}
          {course.department?.name && <p>Department: {course.department.name}</p>}
        </div>

        <Button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl"
          onClick={() => onViewDetails?.(course)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
