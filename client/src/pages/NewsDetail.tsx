import { useParams, Link } from "wouter";
import { highlights } from "@/components/NewsHighlight";
import { Button } from "@/components/ui/button";

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const newsItem = highlights.find(n => n.id === Number(id));

  if (!newsItem) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">News Not Found</h2>
        <Link href="/news">
          <Button className="mt-4 bg-red-700 hover:bg-red-500 text-white px-6 py-2 rounded-lg">
            Back to News
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-red-700 mb-4">{newsItem.title}</h1>
      <p className="text-gray-700 leading-relaxed">{newsItem.fullContent}</p>
      <div className="mt-6">
        <Link href="/news">
          <Button className="bg-red-700 hover:bg-red-500 text-white px-6 py-2 rounded-lg">
            Back to News
          </Button>
        </Link>
      </div>
    </div>
  );
}
