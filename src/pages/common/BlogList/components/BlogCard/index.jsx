import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/dateUtils";
import { ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  return (
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
              {post.description || "No description"}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span>{formatDate(post.updatedAt)}</span>
            </div>

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
  );
};

export default BlogCard;
