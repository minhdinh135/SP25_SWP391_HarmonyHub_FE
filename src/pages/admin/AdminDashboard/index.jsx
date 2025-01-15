import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-black">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">$45,678</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">23</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
