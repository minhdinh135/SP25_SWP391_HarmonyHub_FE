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
        <p class="mb-4">Communication is the backbone of a healthy marriage. Without it, misunderstandings can fester, leading to resentment and emotional distance. If you and your partner want to build a stronger, more connected relationship, mastering effective communication is key. Here are five communication techniques that can help strengthen your marriage and foster deeper understanding.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">1. Practice Active Listening</h2>
        <p class="mb-4">Listening is more than just hearing words—it’s about truly understanding your partner’s feelings and perspectives. Active listening involves:

Maintaining eye contact and giving your full attention

Nodding or offering verbal affirmations like “I understand”

Paraphrasing what your partner said to ensure clarity (e.g., “So what you’re saying is….”)

Avoiding interruptions and resisting the urge to immediately offer solutions

By making your partner feel heard and valued, you create a safe space for open and honest communication.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">2. Use “I” Statements Instead of “You” Statements</h2>
        <p class="mb-4">Conflicts often escalate when partners use accusatory language. Instead of saying, “You never listen to me,” try framing your feelings with “I” statements: “I feel unheard when I try to share something important.”

This approach reduces defensiveness and encourages a more constructive dialogue where both partners can express their emotions without blame.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">3. Set Aside Time for Meaningful Conversations</h2>
        <p class="mb-4">Life’s daily demands can make it easy for meaningful conversations to take a backseat. Prioritize time to check in with each other regularly by:

Scheduling a daily or weekly “talk time” without distractions

Discussing both the highs and lows of your day

Sharing future goals and dreams

Intentional conversations help keep your emotional connection strong and prevent small issues from turning into major conflicts.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">4. Learn to Manage Conflict Respectfully</h2>
        <p class="mb-4">Disagreements are inevitable in any marriage, but how you handle them makes all the difference. Healthy conflict management includes:

Staying calm and avoiding hurtful words or personal attacks

Taking a break if emotions are too heated, then returning to the discussion with a clear mind

Finding compromises where both partners feel heard and respected

Apologizing when necessary and working toward solutions together

When conflict is approached with respect and understanding, it can actually strengthen your relationship rather than weaken it.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">5. Express Appreciation and Affection Regularly</h2>
        <p class="mb-4">Words have the power to uplift and affirm your love for one another. Make it a habit to:

Express gratitude for your partner’s efforts (e.g., “I really appreciate how you took care of the dishes tonight.”)

Offer compliments and words of encouragement

Use affectionate language, whether in person or through texts</p>
      `,
      image:
        "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&auto=format&fit=crop&q=60",
      category: "Communication",
      readTime: "5 min read",
      date: "Mar 15, 2024",
      author: "Dr. Sarah Johnson",
      author_img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      authorRole: "Licensed Marriage Counselor",
    },
    2: {
      title: "Rebuilding Trust After Conflict",
      content: `
        <p class="mb-4">Trust is the foundation of any strong relationship, but conflicts can shake that foundation, leaving behind doubt, resentment, and distance. Whether it’s between partners, friends, colleagues, or family members, rebuilding trust takes time, effort, and commitment from both sides. Here’s how you can navigate the journey toward restoring trust after conflict.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">1. Acknowledge the Hurt</h2>
        <p class="mb-4">The first step in rebuilding trust is acknowledging the impact of the conflict. Both parties should recognize and validate each other’s feelings, rather than dismiss or minimize them. This step requires open and honest communication, allowing both individuals to express their hurt, disappointment, or frustration in a safe space.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">2. Take Responsibility</h2>
        <p class="mb-4">If you were the one who broke the trust, taking responsibility for your actions is crucial. Avoid shifting blame or making excuses. Instead, offer a sincere apology that acknowledges the pain caused. A heartfelt apology should focus on expressing regret, taking ownership, and showing a willingness to make amends.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">3. Listen and Communicate Openly</h2>
        <p class="mb-4">Effective communication plays a significant role in rebuilding trust. Listening with empathy helps the other person feel heard and valued. Use active listening techniques, such as maintaining eye contact, paraphrasing what the other person says, and asking clarifying questions. Open communication prevents misunderstandings and promotes mutual understanding.</p>
        <h2 class="text-2xl font-semibold mt-8 mb-4">4. Be Patient and Consistent</h2>
        <p class="mb-4">Trust isn’t rebuilt overnight. It requires consistent actions over time. Make sure your words align with your behavior—follow through on promises, be reliable, and show commitment to change. The injured party may need time to heal, so patience is essential.</p>
      `,
      image:
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&auto=format&fit=crop&q=60",
      category: "Trust & Healing",
      readTime: "8 min read",
      date: "Mar 12, 2024",
      author: "Dr. Michael Chen",
      author_img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      authorRole: "Relationship Coach",
    },
    3: {
      title: "The Role of Empathy in Marriage",
      content: `
        <p class="mb-4">Empathy is a crucial element in building and maintaining a strong marriage. It allows partners to understand and validate each other’s emotions, fostering deeper connections and emotional intimacy. When empathy is present in a relationship, conflicts become easier to navigate, and trust is strengthened over time. Here’s how empathy plays a vital role in marriage and how couples can cultivate it.</p>
      `,
      image:
        "https://images.unsplash.com/photo-1621252179027-94459d278660?w=800&auto=format&fit=crop&q=60",
      category: "Emotional Support",
      readTime: "6 min read",
      date: "Mar 10, 2024",
      author: "Dr. Emily Rodriguez",
      author_img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
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
            src={post.author_img}
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
