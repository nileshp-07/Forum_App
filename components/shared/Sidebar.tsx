"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'


const sidebarItem = [
    {
        name : "Home",
        link : "/"
    },
    {
        name : "Categories",
        link : "/categories"
    },
    {
        name : "Tags",
        link : "/tags"
    },
    {
        name : "My Threads",
        link : "/threads"
    }
]
const Sidebar = () => {
    const router = useRouter();
  return (
    <div className='min-w-[15%] flex gap-8 flex-col border-r-4 mx-5 flex-shrink-0'>
        {
            sidebarItem.map((item, index) => (
                <Button key={index} className='rounded-full w-[80%]'>
                   <div onClick={() => router.push(item.link)}>
                      {item.name}
                   </div>
                </Button>
            ))
        }


    </div>
  )
}

export default Sidebar