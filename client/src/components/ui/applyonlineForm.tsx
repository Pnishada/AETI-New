"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ApplyFormProps {
  onClose: () => void;
}

export default function ApplyForm({ onClose }: ApplyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    birthday: "",
    certificate: null as File | null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, files } = e.target as HTMLInputElement;
    if (id === "certificate" && files) {
      setFormData((prev) => ({ ...prev, certificate: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Application submitted successfully ✅");
    setFormData({
      name: "",
      email: "",
      phone: "",
      education: "",
      birthday: "",
      certificate: null,
      message: "",
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-3xl bg-white p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply Online</DialogTitle>
          <DialogDescription>
            Fill in your details and our team will contact you soon.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="education">Education</Label>
            <Input id="education" value={formData.education} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="birthday">Birthday</Label>
            <Input id="birthday" type="date" value={formData.birthday} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="certificate">Certificate</Label>
            <Input
              id="certificate"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
            />
            {formData.certificate && (
              <p className="text-sm text-gray-600 mt-1">{formData.certificate.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" value={formData.message} onChange={handleChange} />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-semibold"
            >
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
