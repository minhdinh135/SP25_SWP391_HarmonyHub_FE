import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { getAllBlogs } from "@/api/blogApi";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";

export function BlogList() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await getAllBlogs();
        setBlogs(data);
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
          <div className="mt-8">
            <Button
              className="bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => navigate("/contact")}
            >
              Book a Session
            </Button>
          </div>
        </div>
      </div>

      {/* Blog List Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Latest Articles
        </h2>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No articles available at the moment. Please check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {blogs.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="md:flex">
                  {/* Fixed image container with consistent dimensions */}
                  <div className="md:w-1/3 relative">
                    <div className="aspect-ratio-box relative w-full pb-[75%]">
                      <img
                        src={post.imageUrl || "/api/placeholder/400/300"}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold mb-3 text-gray-800 hover:text-blue-700 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.description ||
                          "Discover insights and practical advice on strengthening your relationship through effective communication, trust-building, and emotional connection."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* <div className="flex items-center text-sm text-gray-500"> */}
                      {/*   <Calendar size={14} className="mr-1" /> */}
                      {/*   <span>{formatDate(post.updatedAt)}</span> */}
                      {/* </div> */}

                      <Button
                        variant="ghost"
                        className="gap-1 text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                        onClick={() => navigate(`/blogs/${post.blogId}`)}
                      >
                        Read More
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
