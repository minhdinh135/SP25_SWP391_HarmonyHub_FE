// src/components/DashboardLayout.jsx
import { useState } from "react";
import { Home, User, Calendar, MessageSquare, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabsConfig = {
  member: [
    { name: "Dashboard", icon: <Home />, key: "dashboard" },
    { name: "Bookings", icon: <Calendar />, key: "bookings" },
    { name: "Services", icon: <Briefcase />, key: "services" },
    { name: "Messages", icon: <MessageSquare />, key: "messages" },
    { name: "Profile", icon: <User />, key: "profile" },
  ],
  therapist: [
    { name: "Dashboard", icon: <Home />, key: "dashboard" },
    { name: "Appointments", icon: <Calendar />, key: "appointments" },
    { name: "Availability", icon: <Briefcase />, key: "availability" },
    { name: "Messages", icon: <MessageSquare />, key: "messages" },
    { name: "Profile", icon: <User />, key: "profile" },
  ],
};

export default function DashboardLayout({ role = "member" }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const tabs = tabsConfig[role];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-4">
          {role === "member" ? "Member" : "Therapist"} Dashboard
        </h1>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.key)}
            className="flex items-center w-full justify-start space-x-2"
          >
            {tab.icon}
            <span>{tab.name}</span>
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">
          {tabs.find((tab) => tab.key === activeTab)?.name}
        </h2>
        <div className="bg-white p-4 rounded shadow">
          Content for {activeTab}
        </div>
      </div>
    </div>
  );
}
