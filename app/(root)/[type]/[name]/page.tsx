"use client"
import React, { useEffect, useState } from 'react';
import { getThreadsByCategory, getThreadsByTag } from '@/lib/actions/thread.action';
import Thread from '@/components/shared/Thread';
import { useRouter } from 'next/navigation';

const Page = ({params} : {params: any}) => {
    const {type, name } = params; 
  const [threads, setThreads] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  const decodedName = decodeURIComponent(name)

  useEffect(() => {
    const fetchData = async () => {
        console.log(type, " " , decodedName)
      setLoading(true);
      try {
        if (type === 'tag') {
          const allTags = await getThreadsByTag(decodedName);
          setThreads(allTags);
        } else if (type === 'category') {
          const tagsData = await getThreadsByCategory(decodedName);
          console.log("all threds", tagsData)
          setThreads(tagsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (type && decodedName) {
      fetchData();
    }
  }, [type, decodedName]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-w-full flex flex-col items-center"> 
    <h2 className='font-semibold text-2xl'>All Threads related to {decodedName} {type === 'categories' ? 'Category' : 'Tag'}</h2>
  
    <div className="w-full">
      {
         threads?.map((thread: any) => (
          <div key={thread.id} onClick={() =>  router.push(`/thread/${thread.id}`)} >
            <Thread thread={thread}/>
           </div>
         ))
      }
    </div>
  </div>
  );
};

export default Page;
