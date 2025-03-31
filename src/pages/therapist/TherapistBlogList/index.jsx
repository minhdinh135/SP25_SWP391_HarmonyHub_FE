import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { getTherapistBlogs, updateBlogStatus } from "@/api/blogApi";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { getBlogStatusText } from "@/utils/enumUtils";
import { getBlogStatusColor } from "@/utils/colorUtils";
import { BlogStatus } from "@/constants/status";

const TherapistBlogList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const data = await getTherapistBlogs(user.accountId);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [user.accountId]);

  const getStatusBadge = (status) => {
    return (
      <Badge className={getBlogStatusColor(status)}>
        {getBlogStatusText(status)}
      </Badge>
    );
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRemoveBlog = async (id) => {
    try {
      setIsLoading(true);
      await updateBlogStatus(id, Number(BlogStatus.Inactive));
      toast.success("Remove blog successfully");
    } catch (error) {
      console.log(error);
      toast.error("Remove blog failed");
    } finally {
      fetchBlogs();
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="therapist">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Blog Posts</h1>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/therapist/new-blog")}
          >
            <Plus className="mr-2 h-4 w-4" /> New Blog Post
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full p-2 pl-10 border border-gray-300 rounded-lg"
            placeholder="Search blog posts by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Card
                key={blog.blogId}
                className="overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    {getStatusBadge(blog.status)}
                  </div>
                  <CardTitle className="text-lg">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {blog.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`${blog.blogId}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View details
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-700"
                    size="sm"
                    onClick={() => handleRemoveBlog(blog.blogId)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />{" "}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-lg bg-gray-50">
            <p className="text-gray-500">
              No blog posts found. Create your first post!
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TherapistBlogList;
