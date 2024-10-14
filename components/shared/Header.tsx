"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Button } from '../ui/button'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from "@/components/ui/dialog"
import CreateThread from './CreateThread'

const Header = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header>
       <div className="wrapper flex items-center justify-between my-10">
          <Link href="/">
             FORUM APP
          </Link>

          <div className='flex gap-3'>
            <SignedOut>
               <Button className='rounded-full' size="lg">
                  <Link href='sign-in'>
                     Login
                  </Link>
               </Button>
            </SignedOut>
            <SignedIn>
               <div className='flex gap-10'>
               <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                     <DialogTrigger asChild>
                        <div className='rounded-full bg-black text-white py-2 px-4 cursor-pointer'>
                           Create Thread
                        </div>
                     </DialogTrigger>
                     <DialogContent>
                        <DialogHeader>
                           <CreateThread closeModal={() => setIsModalOpen(false)} />
                        </DialogHeader>
                     </DialogContent>
                  </Dialog>
                  <UserButton />
               </div>
            </SignedIn>
          </div>
       </div>
    </header>
  )
}

export default Header