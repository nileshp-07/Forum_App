"use client"

import ThreadsCollection from "@/components/shared/ThreadsCollection";
import { getAllThreads } from "@/lib/actions/thread.action";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [threads, setThreads] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false);

  const getRecentThreads = async() => {
     setLoading(true);
     const allThreads = await getAllThreads(page);
     setThreads(allThreads.threads);
     setTotalPages(allThreads.totalPages);

     setLoading(false);
  }

  useEffect(() => {
    getRecentThreads();
  }, [page])

  if(loading)
  {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="min-w-full mx-5 h-screen ">
      <h2 className="text-2xl font-semibold">All Recent Threads</h2>

      <ThreadsCollection threads={threads} page={page} totalPages={totalPages} setPage={setPage}/>
    </div>
  );
}
