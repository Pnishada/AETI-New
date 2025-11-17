"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { api, ContactDetails } from "@/api/api";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(
    null
  );

  // Fetch contact details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await api.getContactDetails();
        if (data.length > 0) setContactDetails(data[0]);
      } catch (err) {
        console.error("Error fetching contact details:", err);
      }
    };
    fetchDetails();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      await api.postContact(form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFF] flex flex-col items-center p-6">
      <Card className="w-full max-w-5xl rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-[#1F4E79] drop-shadow-sm">
            Contact Us
          </CardTitle>
          <p className="text-center text-gray-500">
            We’d love to hear from you. Send us your message below.
          </p>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-10 p-8">
          {/* LEFT SIDE — Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 bg-[#E9F3FF] p-4 rounded-xl shadow-sm">
              <Mail className="text-[#1F7ACC]" />
              <p className="text-gray-700 font-medium">
                {contactDetails ? contactDetails.email : "Loading..."}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#E9FDF7] p-4 rounded-xl shadow-sm">
              <Phone className="text-[#2CA58D]" />
              <p className="text-gray-700 font-medium">
                {contactDetails ? contactDetails.phone : "Loading..."}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#E9FDF7] p-4 rounded-xl shadow-sm">
              <MapPin className="text-[#B68C4A]" />
              <p className="text-gray-700 font-medium">
                {contactDetails ? contactDetails.address : "Loading..."}
              </p>
            </div>

            {/* Google Map */}
            <div className="w-full aspect-video rounded-xl overflow-hidden border shadow-md">
              {contactDetails && (
                <iframe
                  src={contactDetails.map_url}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                />
              )}
            </div>
          </div>

          {/* RIGHT SIDE — Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300 rounded-lg shadow-sm focus:border-[#1F7ACC] focus:ring-[#1F7ACC]"
            />

            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300 rounded-lg shadow-sm focus:border-[#1F7ACC] focus:ring-[#1F7ACC]"
            />

            <Textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="h-32 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-[#1F7ACC] focus:ring-[#1F7ACC]"
            />

            <Button
              type="submit"
              className="w-full bg-[#0084f8] hover:bg-[#0044d6] text-white py-3 rounded-xl text-lg shadow-md transition-all"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>

            {success && (
              <p className="text-[#2CA58D] text-center font-medium">
                ✓ Message sent successfully!
              </p>
            )}
            {error && (
              <p className="text-[#C26D00] text-center font-medium">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
