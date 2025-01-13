import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Sample feedback data
const feedbackData = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    content: "This product has revolutionized my workflow. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=80&width=80",
    content: "Great features, but there's room for improvement in the user interface.",
    rating: 4,
  },
  {
    id: 3,
    name: "Carol Williams",
    avatar: "/placeholder.svg?height=80&width=80",
    content: "Excellent customer support. They resolved my issue quickly.",
    rating: 5,
  },
]

const Feedback = () => {
  return (
    <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md">
      <CarouselContent>
        {feedbackData.map((feedback) => (
          <CarouselItem key={feedback.id}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={feedback.avatar} alt={feedback.name} />
                  <AvatarFallback>{feedback.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-2">{feedback.name}</h3>
                <p className="text-sm text-center text-gray-600 mb-4">{feedback.content}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Feedback

