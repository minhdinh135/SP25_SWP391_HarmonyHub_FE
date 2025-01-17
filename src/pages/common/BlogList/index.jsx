import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
export function BlogList() {
  const navigate = useNavigate();
  const blogPosts = [
    {
      id: 1,
      title: "5 Communication Techniques for a Stronger Marriage",
      excerpt:
        "Discover proven communication strategies that can help strengthen your marital bond and improve understanding between partners.",
      image:
        "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&auto=format&fit=crop&q=60",
      category: "Communication",
      readTime: "5 min read",
      date: "Mar 15, 2024",
    },
    {
      id: 2,
      title: "Rebuilding Trust After Conflict",
      excerpt:
        "Learn effective methods for rebuilding trust and healing your relationship after experiencing conflicts or challenges.",
      image:
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&auto=format&fit=crop&q=60",
      category: "Trust & Healing",
      readTime: "8 min read",
      date: "Mar 12, 2024",
    },
    {
      id: 3,
      title: "The Role of Empathy in Marriage",
      excerpt:
        "Understanding how empathy plays a crucial role in maintaining a healthy and supportive marital relationship.",
      image:
        "https://images.unsplash.com/photo-1621252179027-94459d278660?w=800&auto=format&fit=crop&q=60",
      category: "Emotional Support",
      readTime: "6 min read",
      date: "Mar 10, 2024",
    },
  ];
  return (
    <main className="min-h-screen w-full bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Marital Counseling Blog</h1>
          <p className="text-gray-400">
            Insights and guidance for building stronger, healthier relationships
          </p>
        </div>
      </div>
      {/* Blog List */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover aspect-video md:aspect-auto"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Button
                      variant="ghost"
                      className="gap-2"
                      onClick={() => navigate(`/blogs/${post.id}`)}
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
      </div>
    </main>
  );
}
