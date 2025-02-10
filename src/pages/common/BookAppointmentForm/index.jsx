import { useState } from "react";
import { toast } from "sonner"; // Import toast
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const servicePackages = [
  {
    title: "Initial Consultation",
    description: "A 45-minute session to explore your relationship dynamics and goals.",
    price: "$150",
    value: "initial-consultation"
  },
  {
    title: "Couples Therapy",
    description: "Weekly 1-hour sessions focusing on communication and conflict resolution.",
    price: "$600/month",
    value: "couples-therapy"
  },
  {
    title: "Intensive Weekend Retreat",
    description: "A focused two-day program for couples in crisis.",
    price: "$2,500",
    value: "intensive-retreat"
  }
];

const BookAppointmentForm = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    startTime: "",
    service: "",
    customerNote: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, service: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Show success toast
    toast.success("Your request has been sent to the therapist!");
  };

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-2xl">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="service">Select Service</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger id="service">
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
                {servicePackages.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.title} - {service.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="customerNote">Customer Note</Label>
            <textarea id="customerNote" name="customerNote" value={formData.customerNote} onChange={handleChange} placeholder="Any special requests or notes" className="w-full h-24 p-2 border rounded-md" />
          </div>
          <Button type="submit" className="w-full">Book Appointment</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookAppointmentForm;
