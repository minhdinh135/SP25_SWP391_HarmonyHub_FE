import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getBlogDetails } from "@/api/blogApi";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import { getTherapistDetails } from "@/api/accountApi";
import { getFullName } from "@/utils/nameFormat";
import { formatDateTime } from "@/utils/dateUtils";

export function BlogPost() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [therapistDetails, setTherapistDetails] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const blogData = await getBlogDetails(id);
        setBlog(blogData);

        if (blogData?.therapistId) {
          const therapistData = await getTherapistDetails(blogData.therapistId);
          setTherapistDetails(therapistData);
        }
      } catch (error) {
        console.error(error);
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="relative h-[400px]">
        <div className="absolute inset-0">
          <img
            src={blog?.imageUrl}
            alt={blog?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">{blog?.title}</h1>
            <div className="flex items-center gap-4 text-gray-300">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {formatDateTime(blog?.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 border-b border-gray-200">
        <div className="flex justify-start">
          <Button
            variant="ghost"
            className="gap-2 -ml-2"
            onClick={() => navigate("/blogs")}
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-8">
          <img
            src={therapistDetails?.avatarUrl}
            alt="Therapist"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">
              {getFullName(
                therapistDetails?.firstName,
                therapistDetails?.lastName,
              )}
            </h2>
            <p className="text-gray-600">Therapist</p>
          </div>
        </div>
      </div>
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: blog?.content,
          }}
        />
      </article>
    </main>
  );
}
