import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className='flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">Services</CardTitle>
              <Button className="block px-4 py-2 bg-blue-600 text-white rounded">Create Service</Button>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">Incidents</CardTitle>
              <Button className="block px-4 py-2 bg-blue-600 text-white rounded">Create Incident</Button>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">Update Incident</CardTitle>
              <Button className="block px-4 py-2 bg-blue-600 text-white rounded">Update Incident</Button>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">Maintenance</CardTitle>
              <Button className="block px-4 py-2 bg-blue-600 text-white rounded">Schedule Maintenance</Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}