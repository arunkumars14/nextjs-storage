import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { getTotalSpaceUsed } from '@/lib/actions/file.actions'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

export const dynamic = "force-dynamic";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return redirect("/sign-in")

  const totalSpace = await getTotalSpaceUsed();
  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className='flex h-full flex-1 flex-col'>
        <MobileNavigation {...currentUser} totalSpace={totalSpace}/>
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />

        <div className="main-content">
          {children}
        </div>
      </section>

      <Toaster />
    </main>
  )
}

export default layout