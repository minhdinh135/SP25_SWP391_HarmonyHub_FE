import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export function BlogPost() {
  const navigate = useNavigate();
  const { id } = useParams();

  const posts = {
    1: {
      title: "5 Communication Techniques for a Stronger Marriage",
      content: `
        <p class="mb-4">Effective communication is the cornerstone of a healthy marriage...</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">1. Active Listening</h2>
        <p class="mb-4">Active listening involves fully concentrating on what your partner is saying...</p>
      `,
      image:
        "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&auto=format&fit=crop&q=60",
      category: "Communication",
      readTime: "5 min read",
      date: "Mar 15, 2024",
      author: "Dr. Sarah Johnson",
      authorRole: "Licensed Marriage Counselor",
    },
    2: {
      title: "Rebuilding Trust After Conflict",
      content: `
        <p class="mb-4">Conflict is inevitable in any relationship, but how you handle it makes all the difference.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">1. Stay Calm</h2>
        <p class="mb-4">Avoid escalating the situation. Take a deep breath and approach the conversation rationally.</p>
      `,
      image:
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&auto=format&fit=crop&q=60",
      category: "Trust & Healing",
      readTime: "8 min read",
      date: "Mar 12, 2024",
      author: "Emily Carter",
      authorRole: "Relationship Coach",
    },
    3: {
      title: "The Role of Empathy in Marriage",
      content: `
        <p class="mb-4">Trust is the foundation of any strong relationship. Without it, everything crumbles.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">1. Be Honest</h2>
        <p class="mb-4">Transparency and honesty help build a safe and secure connection between partners.</p>
      `,
      image:
        "https://images.unsplash.com/photo-1621252179027-94459d278660?w=800&auto=format&fit=crop&q=60",
      category: "Emotional Support",
      readTime: "6 min read",
      date: "Mar 10, 2024",
      author: "Michael Reynolds",
      authorRole: "Certified Therapist",
    },
  };

  const post = posts[id] || {
    title: "Post Not Found",
    content: `<p class="text-gray-600">Sorry, the requested blog post does not exist.</p>`,
    image: "https://via.placeholder.com/800x400?text=Post+Not+Found",
    category: "Unknown",
    readTime: "--",
    date: "--",
    author: "Unknown",
    authorRole: "--",
  };

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="relative h-[400px]">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-300">
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {post.date}
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
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60"
            alt={post.author}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">{post.author}</h2>
            <p className="text-gray-600">{post.authorRole}</p>
          </div>
        </div>
      </div>
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </article>
    </main>
  );
}
