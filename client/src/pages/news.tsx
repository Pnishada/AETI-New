"use client";

import { useState, useEffect } from "react";
import { api } from "@/api/api";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  link: string;
  description: string;
}

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.getNews();
        setNewsData(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">Loading news...</p>
      </div>
    );
  }

  if (!newsData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">No news available at the moment.</p>
      </div>
    );
  }

  const featured = newsData[0];
  const others = newsData.slice(1);

  // Helper function to fix image URLs from Django
  const getImageUrl = (path?: string) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `http://127.0.0.1:8000${path}`;
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-white text-black py-16 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Automobile Engineering Training Institute
        </h1>
        <p className="mt-3 text-xl text-gray-600">Orugodawatta</p>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-500">
          Stay updated with the latest happenings, achievements, and events at AETI Colombo.
        </p>
      </section>

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Featured News */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            {featured.image && (
              <img
                src={getImageUrl(featured.image)}
                alt={featured.title}
                className="w-full h-72 object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{featured.title}</h2>
              <p className="text-sm mb-3">{new Date(featured.date).toDateString()}</p>
              {featured.link && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#1889bd] px-5 py-2 rounded-full hover:bg-[#13758d] transition"
                >
                  Read More
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-6">
            {others.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
              >
                {item.image && (
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-32 h-24 object-cover"
                  />
                )}
                <div className="p-3">
                  <h3 className="text-lg font-semibold hover:text-[#118adb]">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(item.date).toDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All News Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-black">Latest News</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                {item.image && (
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 hover:text-[#2278b2]">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(item.date).toDateString()}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {/* <div className="text-center mt-8">
            <button className="bg-[#B22222] hover:bg-[#8B0000] text-white px-6 py-3 rounded-full shadow transition">
              Load More
            </button>
          </div> */}
        </section>
      </div>
    </>
  );
}
