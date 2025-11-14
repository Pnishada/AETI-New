import { useParams, Link } from "wouter";
import { highlights } from "@/components/NewsHighlight";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const newsItem = highlights.find(n => n.id === Number(id));

  if (!newsItem) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <motion.h2 
          className="text-3xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          News Not Found
        </motion.h2>
        <Link href="/news">
          <Button className="bg-red-700 hover:bg-red-500 text-white px-8 py-3 rounded-full shadow-lg transition-all">
            Back to News
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto py-16 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Featured Image */}
        {newsItem.image && (
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-10">
          {/* Title */}
          <h1 className="text-4xl font-bold text-red-700 mb-4">{newsItem.title}</h1>

          {/* Closing Date */}
          {newsItem.closingDate && (
            <p className="text-sm text-gray-500 mb-4">
              <strong>Closing Date:</strong> {newsItem.closingDate}
            </p>
          )}

          {/* Full Content */}
          <p className="text-gray-700 leading-relaxed text-lg mb-6">{newsItem.fullContent}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/news">
              <Button className="bg-red-700 hover:bg-red-500 text-white px-6 py-3 rounded-full shadow-lg transition-all">
                Back to News
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
