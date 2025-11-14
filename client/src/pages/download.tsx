"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { api } from "@/api/api";

interface DownloadItem {
  id: number;
  title: string;
  file: string;
  description: string;
  uploaded_at: string;
}

export default function DownloadPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const data = await api.getDownloads();
        setDownloads(data);
      } catch (error) {
        console.error("Failed to fetch downloads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  const downloadFile = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileUrl.split("/").pop() || "document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (loading) {
    return (
      <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading downloads...</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#8B1E1E] mb-3">Downloads</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Access official forms, brochures, and documents for students and applicants. Click download to save files directly to your device.
          </p>
        </div>

        {/* Downloads Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col p-6 rounded-3xl bg-gradient-to-b from-white/80 to-white/50 backdrop-blur-md shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500"
            >
              {/* Icon & Title */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-full bg-[#8B1E1E]/20 text-[#8B1E1E] group-hover:bg-[#8B1E1E]/30 transition-colors duration-300">
                  <Download className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h2>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 line-clamp-5">{item.description}</p>

              {/* Download Button */}
              <button
                onClick={() => downloadFile(item.file)}
                className="mt-auto w-full bg-gradient-to-r from-[#8B1E1E] to-[#6F1616] hover:from-[#6F1616] hover:to-[#5A1111] text-white px-4 py-3 rounded-xl shadow-md font-semibold flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>

              {/* Upload Date */}
              <p className="text-xs text-gray-400 mt-3 text-right">
                Uploaded: {new Date(item.uploaded_at).toLocaleDateString()}
              </p>

              {/* Subtle hover overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#8B1E1E]/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
