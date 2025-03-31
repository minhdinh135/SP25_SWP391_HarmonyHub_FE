import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { getAllBlogs } from "@/api/blogApi";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import { formatDate } from "@/utils/dateUtils";
import { BlogStatus } from "@/constants/status";
import ItemList from "@/components/ItemList";
import BlogCard from "./components/BlogCard";

export function BlogList() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await getAllBlogs();
        const activeBlogs = data
          .filter((item) => item.status === BlogStatus.Active)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setBlogs(activeBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error(error.message || "Failed to load blogs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Spinner />
      </div>
    );

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Marital Counseling Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights and guidance for building stronger, healthier relationships
          </p>
        </div>
      </div>

      {/* Blog List Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Latest Blogs
        </h2>

        <ItemList
          className="grid gap-8"
          data={blogs}
          renderItem={(blog) => <BlogCard key={blog.blogId} post={blog} />}
        />
      </div>
    </main>
  );
}
