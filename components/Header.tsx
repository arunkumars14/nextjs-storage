import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Search from './Search'
import FileUploader from './FileUploader'
import { signOutUser } from '@/lib/actions/user.actions'
import { getTotalSpaceUsed } from '@/lib/actions/file.actions'

const Header = async ({userId, accountId}: {userId: string, accountId: string}) => {

    const totalSpace = await getTotalSpaceUsed();

  return (
    <header className="header">
        <Search />

        <div className="header-wrapper">
            <FileUploader ownerId={userId} accountId={accountId} totalSpace={totalSpace}/>

            <form action={async() => {
                "use server"
                await signOutUser()
            }} className="">

                <Button type='submit' className='sign-out-button'>
                    <Image  
                        src={"/assets/icons/logout.svg"}
                        alt='logg'
                        width={24}
                        height={24}
                        className='w-6'
                    />
                </Button>
            </form>
        </div>
    </header>
  )
}

export default Header