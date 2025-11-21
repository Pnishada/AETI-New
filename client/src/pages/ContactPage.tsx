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
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);

  // Fetch contact details
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const data = await api.getContactDetails();
        if (data.length > 0) setContactDetails(data[0]); // assume only 1 row
      } catch (err) {
        console.error("Error fetching contact details:", err);
      }
    };
    fetchContactDetails();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      console.error("Error sending message:", err);
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <Card className="w-full max-w-4xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Contact Us</CardTitle>
          <p className="text-center text-gray-500">We’d love to hear from you! Fill out the form below.</p>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-8 p-6">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" />
              <p className="text-gray-700">{contactDetails ? contactDetails.email : "Loading..."}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-green-600" />
              <p className="text-gray-700">{contactDetails ? contactDetails.phone : "Loading..."}</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600" />
              <p className="text-gray-700">{contactDetails ? contactDetails.address : "Loading..."}</p>
            </div>

            {/* Google Map */}
            <div className="w-full aspect-video rounded-xl overflow-hidden border">
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

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="h-32"
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>

            {success && <p className="text-green-600 text-center mt-2">Message sent successfully!</p>}
            {error && <p className="text-blue-600 text-center mt-2">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
