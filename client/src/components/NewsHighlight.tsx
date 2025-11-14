import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NewsHighlight() {
  const highlights = [
    {
      id: 1,
      title: "New advanced workshop opened",
      excerpt: "State-of-the-art workshop for hands-on training is now operational.",
    },
    {
      id: 2,
      title: "2025 Enrollment open",
      excerpt: "Apply now for Advanced Diploma in Automobile Engineering for 2025 intake.",
    },
    {
      id: 3,
      title: "Partnership with manufacturers",
      excerpt: "AETI signs MoU with leading automotive manufacturers for internships.",
    },
  ];

  return (
    <section
      id="news"
      className="lg:sticky lg:top-24 bg-red-100 border border-red-300 p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-2xl font-bold text-red-800 mb-4">News & Highlights</h3>

      <div className="space-y-4">
        {highlights.map((h) => (
          <article
            key={h.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-semibold text-slate-800">{h.title}</h4>
            <p className="text-sm text-slate-600 mt-1">{h.excerpt}</p>

            <Link href={`/news/${h.id}`}>
              <button className="mt-3 text-sm font-medium text-red-700 hover:underline">
                Read more
              </button>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href="/news">
          <Button className="bg-red-700 hover:bg-red-500 text-white px-6 py-2 rounded-lg">
            All News
          </Button>
        </Link>
      </div>
    </section>
  );
}
