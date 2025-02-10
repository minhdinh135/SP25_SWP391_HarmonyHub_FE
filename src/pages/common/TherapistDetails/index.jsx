import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Mail, Phone, MapPin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import BookAppointmentForm from "../BookAppointmentForm";
import { Link } from "react-router-dom";

const TherapistDetails = () => {
  const id = useParams();
  return (
    <div id="webcrumbs" className="flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white">
        <div className="p-6">
          <div className="flex gap-6 items-center">
            <Avatar className="h-36 w-36">
              <AvatarImage
                src="/api/placeholder/150/150"
                alt="Dr. Emily Harper"
              />
              <AvatarFallback>EH</AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-between flex-grow">
              <div>
                <h1 className="text-2xl font-semibold">Dr. Emily Harper</h1>
                <p className="text-muted-foreground">
                  Licensed Marriage Counselor
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  10 years experience
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-bold">4.9</span>
                <span className="text-sm text-muted-foreground">
                  (127 reviews)
                </span>
                <Badge variant="success" className="ml-2">
                  Available
                </Badge>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Link to="/bookappointment">
                <Button className="w-36">Book Appointment</Button>
              </Link>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                About the Therapist
              </h2>
              <p className="text-sm text-muted-foreground">
                With over 10 years of experience, Dr. Harper specializes in
                conflict resolution, intimacy building, and communication
                improvement for couples.
              </p>
              <div className="flex gap-2 mt-3">
                <Badge variant="secondary">Marriage Counseling</Badge>
                <Badge variant="secondary">Relationship Recovery</Badge>
                <Badge variant="secondary">Communication Coaching</Badge>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Service Packages</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Initial Consultation",
                    description:
                      "A 45-minute session to explore your relationship dynamics and goals.",
                    price: "$150",
                  },
                  {
                    title: "Couples Therapy",
                    description:
                      "Weekly 1-hour sessions focusing on communication and conflict resolution.",
                    price: "$600/month",
                  },
                  {
                    title: "Intensive Weekend Retreat",
                    description:
                      "A focused two-day program for couples in crisis.",
                    price: "$2,500",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-muted rounded-lg"
                  >
                    <div>
                      <h3 className="font-bold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <span className="text-primary font-bold">
                      {service.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Availability</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Below is the calendar view for the current week:
              </p>
              <div className="flex gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => (
                    <div
                      key={index}
                      className={`p-4 text-center rounded-lg ${day === "Sun"
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary text-primary-foreground"
                        }`}
                    >
                      <span className="block text-sm font-semibold">{day}</span>
                      <span className="block text-xs mt-1">
                        {day === "Sun" ? "Closed" : "9:00 AM - 6:00 PM"}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    dr.harper@relationshiphelp.com
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    123 Harmony Lane, Suite 456, Springfield
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDetails;
