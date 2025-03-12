import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye } from "lucide-react";
import { toast } from "sonner";
import { getAllBlogs } from "@/api/blogApi";
import Spinner from "@/components/Spinner";

const AdminBlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.log(error);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Map status codes to readable labels
  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return { label: "Draft", color: "bg-yellow-500" };
      case 2:
        return { label: "Published", color: "bg-green-500" };
      default:
        return { label: "Unknown", color: "bg-gray-500" };
    }
  };

  // Function to handle status change
  const handleStatusChange = (blogId, newStatus) => {
    setBlogs(
      blogs.map((blog) =>
        blog.blogId === blogId
          ? { ...blog, status: parseInt(newStatus) }
          : blog,
      ),
    );
    // In a real application, you would make an API call here
    console.log(`Updated blog ${blogId} status to ${newStatus}`);
  };

  // Function to preview blog
  const handlePreview = (blog) => {
    setSelectedBlog(blog);
    setIsPreviewOpen(true);
  };

  // Filter blogs based on status
  const filteredBlogs =
    statusFilter === "all"
      ? blogs
      : blogs.filter((blog) => blog.status === parseInt(statusFilter));

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Blog Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blogs</SelectItem>
                  <SelectItem value="1">Draft</SelectItem>
                  <SelectItem value="2">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add New Blog
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="w-1/4">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Therapist ID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.map((blog) => (
                <TableRow key={blog.blogId}>
                  <TableCell>{blog.blogId}</TableCell>
                  <TableCell>
                    <img
                      src={blog.imageUrl}
                      alt="Blog thumbnail"
                      className="rounded object-cover w-20 h-16"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        getStatusLabel(blog.status).color + " text-white"
                      }
                    >
                      {getStatusLabel(blog.status).label}
                    </Badge>
                  </TableCell>
                  <TableCell>{blog.therapistId}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Select
                        value={blog.status.toString()}
                        onValueChange={(value) =>
                          handleStatusChange(blog.blogId, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Change Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Draft</SelectItem>
                          <SelectItem value="2">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePreview(blog)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Blog Preview Modal */}
      {isPreviewOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-screen overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Blog Preview: {selectedBlog.title}</CardTitle>
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <img
                  src="/api/placeholder/800/400"
                  alt="Blog header"
                  className="w-full rounded object-cover mb-4"
                />
                <div className="flex justify-between items-center mb-4">
                  <Badge
                    className={
                      getStatusLabel(selectedBlog.status).color + " text-white"
                    }
                  >
                    {getStatusLabel(selectedBlog.status).label}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Therapist ID: {selectedBlog.therapistId}
                  </span>
                </div>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminBlogManagement;
