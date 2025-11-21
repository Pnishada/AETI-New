import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Course } from "@/api/api";

interface Props {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export default function CourseDetailsDialog({
  course,
  onClose,
  onEnroll,
}: Props) {
  if (!course) return null;

  const imageUrl = course.image
    ? course.image.startsWith("http")
      ? course.image
      : `http://127.0.0.1:8000${course.image}`
    : "/default-course.jpg";

  return (
    <Dialog open={!!course} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden rounded-3xl shadow-2xl">
        {/* Course Image */}
        <div className="relative h-64 sm:h-80 w-full">
          <img
            src={imageUrl}
            alt={course.name}
            className="absolute inset-0 w-full h-full object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-t-3xl" />

          <div className="absolute bottom-6 left-6 flex flex-col gap-3 text-white">
            <h2 className="text-2xl font-bold leading-tight">{course.name}</h2>
            <p className="text-sm text-gray-200 max-w-md">
              {course.description}
            </p>
          </div>
        </div>

        {/* Course Details */}
        <div className="p-6 space-y-6">
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-b">
                <th className="py-2 px-4 font-medium w-1/3 text-gray-700">
                  Duration
                </th>
                <td className="py-2 px-4 text-gray-900">{course.duration}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 font-medium text-gray-700">
                  Department ID
                </th>
                <td className="py-2 px-4 text-gray-900">
                  {course.department || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>

          <DialogFooter className="pt-4 flex justify-end">
            <Button
              onClick={() => onEnroll(course)}
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Enroll Now
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
