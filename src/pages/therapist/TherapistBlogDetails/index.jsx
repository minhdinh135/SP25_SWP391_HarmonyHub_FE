import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { getBlogDetails } from "@/api/blogApi";
import { getBlogStatusColor } from "@/utils/colorUtils";
import { getBlogStatusText } from "@/utils/enumUtils";

const TherapistBlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getBlogDetails(id);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        toast.error("Failed to load blog details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/blogs/edit/${blog.blogId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) return <Spinner />;
  if (!blog) return <div className="text-center py-10">Blog not found</div>;

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blogs
      </Button>

      {/* Blog Status and Actions */}
      <div className="flex justify-between items-center mb-6">
        <Badge className={getBlogStatusColor(blog.status)}>
          {getBlogStatusText(blog.status)}
        </Badge>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Blog Content Card */}
      <Card className="overflow-hidden shadow-md">
        {blog.imageUrl && (
          <div className="w-full h-80 relative">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Published: {formatDate(blog.createdAt)}</span>
            </div>
            {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Updated: {formatDate(blog.updatedAt)}</span>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Blog content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TherapistBlogDetails;
