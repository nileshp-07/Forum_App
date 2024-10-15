"use client"

import Link from 'next/link'
import React from 'react'
import Thread from './Thread'
import Pagination from './Pagination'

const ThreadsCollection = ({threads, page, totalPages, setPage} : {threads: any, page: any, totalPages: any, setPage: any}) => {
  return (
    <div>
     {
      threads?.map((thread: any) => (
       <Link href={`thread/${thread.id}`}>
         <Thread key={thread.id} thread={thread}/>
       </Link>
     ))
     }

     <Pagination  page={page} totalPages={totalPages} setPage={setPage}/>
    </div>
  )
}

export default ThreadsCollection