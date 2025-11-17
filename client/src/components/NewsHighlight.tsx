"use client";

import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { api, NewsItem } from "@/api/api";

// Named export: in case other modules want to access a default set of highlights
export const highlights: NewsItem[] = [
  {
    id: 1,
    title: "New advanced workshop opened",
    date: new Date().toISOString(),
    image: "",
    link: "",
    description: "State-of-the-art workshop for hands-on training is now operational.",
  },
  {
    id: 2,
    title: "2025 Enrollment open",
    date: new Date().toISOString(),
    image: "",
    link: "",
    description: "Apply now for Advanced Diploma in Automobile Engineering for 2025 intake.",
  },
  {
    id: 3,
    title: "Partnership with manufacturers",
    date: new Date().toISOString(),
    image: "",
    link: "",
    description: "AETI signs MoU with leading automotive manufacturers for internships.",
  },
];

export default function NewsHighlight() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.getNews();
        setNews(data.slice(0, 3)); // Latest 3 highlights
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setNews(highlights); // fallback to default highlights
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="p-6 text-center">
        <p className="text-gray-700">Loading news highlights...</p>
      </section>
    );
  }

  return (
    <section
      id="news"
      className="lg:sticky lg:top-24 bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        News & Highlights
      </h3>

      <div className="space-y-5">
        {news.map((item) => (
          <article
            key={item.id}
            className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 gap-4 group relative overflow-hidden"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full md:w-32 h-20 object-cover rounded-lg"
              />
            )}

            <div className="flex-1">
              <div className="flex justify-between items-start md:items-center">
                <h4 className="font-semibold text-gray-900 text-lg">{item.title}</h4>
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>

              <div className="mt-2">
                <Link href={item.link || `/news/${item.id}`}>
                  <Button className="text-blue-700 hover:text-white hover:bg-blue-700 px-3 py-1 text-sm">
                    Read more
                  </Button>
                </Link>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none rounded-xl"></div>
          </article>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href="/news">
          <Button className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
            All News
          </Button>
        </Link>
      </div>
    </section>
  );
}
