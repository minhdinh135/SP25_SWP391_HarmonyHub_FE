import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is this platform about?",
      answer:
        "Our platform connects couples with certified therapists for premarital counseling, helping them build a strong foundation for marriage.",
    },
    {
      question: "How do I book a consultation?",
      answer:
        "You can book a consultation by selecting a therapist, choosing an available time slot, waiting for request acceptance from the therapist and completing the payment process.",
    },
    {
      question: "Are the therapists qualified?",
      answer:
        "Yes, all therapists on our platform are required to submit valid certificates and qualifications before offering their services.",
    },
    {
      question: "What topics are covered in premarital counseling?",
      answer:
        "Premarital counseling covers topics such as communication, conflict resolution, financial planning, intimacy, and family dynamics.",
    },
    {
      question: "Can I reschedule or cancel my booking?",
      answer:
        "Yes, you can reschedule or cancel your booking through your dashboard. However, you cannot cancel the booking after the booking has been paid. Please check our terms and conditions for details.",
    },
    {
      question: "Is online counseling available?",
      answer:
        "Yes, we offer  online counseling sessions using Google Meet for meeting between members/customers and therapists.",
    },
    {
      question: "How much does a session cost?",
      answer:
        "Session costs vary depending on the therapist you choose. You can view pricing details on the therapist's profile before booking.",
    },
    {
      question: "Do both partners need to attend the session?",
      answer:
        "While it is recommended for both partners to attend, individual sessions are also available if one partner prefers to participate alone.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our support team through email or send report in your dashboard on our platform for any assistance.",
    },
  ];
  return (
    <section className="py-12 px-12">
      <div className="container">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-5xl">
          Frequently asked questions
        </h1>
        {faqs.map((faq, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
