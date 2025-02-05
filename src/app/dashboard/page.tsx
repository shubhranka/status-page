import { SignOutButton } from '@/components/SignOutButton';
import { currentUser } from '@clerk/nextjs/server';
import CreateService from './service';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import CreateIncidents from './createIncidents';
import UpdateIncident from './updateIncidents';
import CreateMaintenance from './createMaintenance';

export default async function AdminDashboard() {

    const user = await currentUser()

  return (
    <div className="p-8 relative">
        <div className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
        <SignOutButton/>
        </div>
        <div className='flex gap-8'>
            <Link href={'/'}>
        <MoveLeft className='w-6 h-6 cursor-pointer' />
            </Link>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        </div>
      <div className='flex flex-col gap-4'>
        { user?.privateMetadata.role === "admin" && <CreateService /> }
        <CreateIncidents />
        <UpdateIncident />
        <CreateMaintenance />
      </div>
    </div>
  );
}