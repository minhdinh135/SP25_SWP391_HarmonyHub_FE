import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Editor from "@/components/Editor";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { createBlog } from "@/api/blogApi";
import { uploadFile } from "@/api/cloudinaryApi";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";

const TherapistBlogManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setBlogImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeImage = () => {
    setBlogImage(null);
    setImagePreview("");
  };

  const handleContentChange = (content) => {
    setBlogContent(content);
  };

  const handleCreateBlog = async () => {
    try {
      setIsLoading(true);
      const imageUrl = await uploadFile(blogImage);

      const payload = {
        title: blogTitle,
        description: blogDescription,
        imageUrl: imageUrl,
        content: blogContent,
        therapistId: user.accountId,
      };
      console.log("Payload: ", payload);
      await createBlog(payload);
      toast.success("Create blog successfully");
      navigate("/therapist/blogs");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <DashboardLayout role="therapist">
      <div className="max-w-4xl mx-auto pb-10">
        <h1 className="text-2xl font-semibold mb-6">Create New Blog</h1>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="blog-title"
                  className="text-base font-medium block mb-2"
                >
                  Blog Title
                </Label>
                <Input
                  id="blog-title"
                  placeholder="Enter blog title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label
                  htmlFor="blog-description"
                  className="text-base font-medium block mb-2"
                >
                  Blog Description
                </Label>
                <Textarea
                  id="blog-description"
                  placeholder="Enter a short description of your blog"
                  value={blogDescription}
                  onChange={(e) => setBlogDescription(e.target.value)}
                  className="w-full min-h-[100px]"
                />
              </div>

              <div>
                <Label className="text-base font-medium block mb-2">
                  Featured Image
                </Label>
                {!imagePreview ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {isDragActive
                          ? "Drop the image here"
                          : "Drag & drop an image here, or click to select one"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports: JPG, PNG, GIF, WEBP
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="border rounded-md overflow-hidden max-h-64 flex items-center justify-center bg-gray-100">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full max-h-64 object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Label className="text-base font-medium block mb-2">Blog Content</Label>
        <div className="bg-white rounded-md shadow mb-6">
          <Editor onContentChange={handleContentChange} />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleCreateBlog} className="px-6 py-2">
            Create Blog
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TherapistBlogManagement;
