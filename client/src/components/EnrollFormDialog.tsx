import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Props {
  courseTitle: string;
  open: boolean;
  onClose: () => void;
}

export default function EnrollFormDialog({ courseTitle, open, onClose }: Props) {
  const [formData, setFormData] = useState({
    course: courseTitle,
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted ✅", formData);
    setFormData({ course: courseTitle, name: "", email: "", phone: "", message: "" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Enroll Now</DialogTitle>
          <DialogDescription>
            Fill in your details and we’ll contact you soon.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input id="course" value={courseTitle} readOnly className="bg-gray-100 font-semibold" />
          </div>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" value={formData.message} onChange={handleChange} />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white">
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
