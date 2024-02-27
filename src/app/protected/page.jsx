import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Homepage } from "@/components/homepage";

export default async function Protected() {

  // Test page that requires the user to sign if they have not already
  // Page NOT in use currently 
  // Server component implementation of the redirect and authentication 

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/protected');
  }

  return (
    <div layout className="flex overflow-y-auto h-full sm:my-10 lg:my-0 flex-col items-center justify-center ">
        <Homepage /> 
      </div>
  );
}