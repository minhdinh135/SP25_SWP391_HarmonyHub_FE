
import React, { useRef } from "react";
import Slider from "react-slick";

const feedbacks = [
  {
    id: 1,
    name: "John & Jane Doe",
    text: "Harmony Hub helped us improve our communication skills, and we're already seeing positive changes in our relationship.",
    image: "https://via.placeholder.com/150", // Replace with a valid image URL
  },
  {
    id: 2,
    name: "Mary & John Smith",
    text: "The premarital counseling content was insightful and really helped us understand each other's expectations better.",
    image: "https://via.placeholder.com/150", // Replace with a valid image URL
  },
  {
    id: 3,
    name: "Sarah & James",
    text: "We are so grateful for the advice we received here. It gave us tools to handle difficult situations with patience.",
    image: "https://via.placeholder.com/150", // Replace with a valid image URL
  },
  // Add more feedback objects as needed
];

const FeedbackCardSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false, // Disables dots navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show only one feedback at a time
    slidesToScroll: 1,
    autoplay: false, // Disable autoplay since we now have custom buttons
    arrows: false, // Disable default arrows
  };

  const goNext = () => {
    sliderRef.current.slickNext();
  };

  const goPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="mt-8 relative">
      <Slider {...settings} ref={sliderRef}>
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white p-6 shadow-lg rounded-lg">
            <div className="flex items-center mb-4">
              <img
                src={feedback.image}
                alt={feedback.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <h3 className="font-bold text-lg">{feedback.name}</h3>
            </div>
            <p className="text-gray-600">{feedback.text}</p>
          </div>
        ))}
      </Slider>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button
          onClick={goPrev}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
        >
          &lt;
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button
          onClick={goNext}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FeedbackCardSlider;
