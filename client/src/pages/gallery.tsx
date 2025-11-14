"use client";

import { useState, useEffect } from "react";
import { api } from "@/api/api";
import { FaPlayCircle, FaTimes } from "react-icons/fa";

type GalleryItem = {
  id: number;
  type: "Image" | "Video";
  image: string;
  caption: string;
  thumbnail?: string;
};

type AcademicItem = {
  id: number;
  title: string;
  description: string;
  link?: string;
};

export default function Gallery() {
  const [activeMainTab, setActiveMainTab] = useState<"Gallery" | "Academic">("Gallery");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabTransition, setTabTransition] = useState(false);
  const [lightbox, setLightbox] = useState<{ type: "Image" | "Video"; src: string } | null>(null);

  const academicItems: AcademicItem[] = [
    { id: 1, title: "Academic Plan 2025", description: "Detailed curriculum and course plan for 2025.", link: "/docs/academic-plan-2025.pdf" },
    { id: 2, title: "Academic Calendar", description: "Important dates, holidays, and exam schedules.", link: "/docs/academic-calendar.pdf" },
    { id: 3, title: "Program Schedule", description: "Training sessions, workshops, and project timelines." },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const dataFromApi: any[] = await api.getGallery();

        // Map API type to strict "Image" | "Video"
        const mappedData: GalleryItem[] = dataFromApi.map((item) => ({
          ...item,
          type: item.type === "Video" ? "Video" : "Image",
        }));

        setGalleryItems(mappedData);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const getMediaUrl = (path?: string) =>
    path ? (path.startsWith("http") ? path : `http://127.0.0.1:8000${path}`) : "";

  const handleMainTabChange = (tab: "Gallery" | "Academic") => {
    setTabTransition(true);
    setTimeout(() => {
      setActiveMainTab(tab);
      setTabTransition(false);
    }, 200);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">Loading gallery...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
            Explore Our Resources
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-yellow-100 leading-relaxed drop-shadow-sm animate-fade-in delay-200">
            Discover AETI's programs, events, academic plans, and visual gallery all in one place.
          </p>
        </div>
      </section>

      {/* Sticky Main Tabs */}
      <section className="sticky top-0 bg-gray-50 z-20 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex justify-center gap-6">
          {["Gallery", "Academic"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleMainTabChange(tab as "Gallery" | "Academic")}
              aria-label={`Switch to ${tab} tab`}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform ${
                activeMainTab === tab
                  ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg scale-105"
                  : "bg-white text-red-800 border border-red-600 hover:bg-red-600 hover:text-white hover:scale-105"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className={`py-12 max-w-6xl mx-auto px-4 transition-opacity duration-200 ${tabTransition ? "opacity-0" : "opacity-100"}`}>
        {activeMainTab === "Gallery" && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightbox({ type: item.type, src: getMediaUrl(item.image) })}
                className="mb-6 relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 cursor-pointer group break-inside-avoid"
              >
                {/* Media */}
                {item.type === "Image" ? (
                  <img
                    src={getMediaUrl(item.image)}
                    alt={item.caption || "Gallery image"}
                    className="w-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="relative">
                    <img
                      src={getMediaUrl(item.thumbnail || item.image)}
                      alt={item.caption || "Gallery video"}
                      className="w-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white text-5xl opacity-80">
                      <FaPlayCircle />
                    </div>
                  </div>
                )}

                {/* Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 rounded-3xl">
                  <p className="text-white font-semibold text-md md:text-lg text-center w-full">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMainTab === "Academic" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {academicItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-500 p-6 flex flex-col justify-between transform hover:-translate-y-2 hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-full text-center font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    View Document
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 text-white text-3xl z-50"
          >
            <FaTimes />
          </button>
          {lightbox.type === "Image" ? (
            <img src={lightbox.src} className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg" alt="Expanded view" />
          ) : (
            <video src={lightbox.src} controls autoPlay className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg" />
          )}
        </div>
      )}
    </div>
  );
}
