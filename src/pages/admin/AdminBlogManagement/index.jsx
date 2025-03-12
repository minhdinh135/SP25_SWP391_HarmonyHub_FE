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
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { getAllBlogs, updateBlogStatus } from "@/api/blogApi";
import Spinner from "@/components/Spinner";
import { BlogStatus } from "@/constants/status";
import { getBlogStatusText } from "@/utils/enumUtils";
import { getBlogStatusColor } from "@/utils/colorUtils";

const AdminBlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateBlogStatus = async (blogId, statusEnum) => {
    try {
      setIsLoading(true);
      await updateBlogStatus(blogId, statusEnum);
      toast.success("Update blog status successfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      fetchData();
      setIsLoading(false);
    }
  };

  const handlePreview = (blog) => {
    setSelectedBlog(blog);
    setIsPreviewOpen(true);
  };

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
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value={BlogStatus.Pending}>Pending</SelectItem>
                  <SelectItem value={BlogStatus.Active}>Active</SelectItem>
                  <SelectItem value={BlogStatus.Inactive}>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                        getBlogStatusColor(blog.status) + " text-white"
                      }
                    >
                      {getBlogStatusText(blog.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{blog.therapistId}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleUpdateBlogStatus(blog.blogId, BlogStatus.Active)
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleUpdateBlogStatus(
                            blog.blogId,
                            BlogStatus.Inactive,
                          )
                        }
                      >
                        Reject
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePreview(blog)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                  src={selectedBlog.imageUrl}
                  alt="Blog header"
                  className="w-full rounded object-cover mb-4"
                />
                <div className="flex justify-between items-center mb-4">
                  <Badge
                    className={
                      getBlogStatusColor(selectedBlog.status) + " text-white"
                    }
                  >
                    {getBlogStatusText(selectedBlog.status)}
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
