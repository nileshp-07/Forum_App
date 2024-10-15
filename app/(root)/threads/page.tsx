"use client"

import ThreadsCollection from '@/components/shared/ThreadsCollection';
import {getThreadsByUserId } from '@/lib/actions/thread.action';
import React, { useEffect, useState } from 'react'

const AllThreads = () => {
    const [page, setPage] = useState(1);
    const [threads, setThreads] = useState<any>([]);
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false);
    const userId = "670cfc4564aa08b93aea2032"; // As there is some issue with the deployement so i can't setup the webhook for the clerk that's why using the temporaray userId
  
    const getUserAllThreads = async() => {
       setLoading(true);
       const allThreads = await getThreadsByUserId(userId, page);
       setThreads(allThreads?.threads)
       setTotalPages(allThreads?.totalPages!)
       setLoading(false);
    }
  
    useEffect(() => {
        getUserAllThreads();
    }, [page])
  
    if(loading)
    {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="min-w-full mx-5 h-screen ">
        <h2 className="text-2xl font-semibold">Your Threads</h2>
  
        <ThreadsCollection threads={threads} page={page} totalPages={totalPages} setPage={setPage}/>
      </div>
    );
}

export default AllThreads