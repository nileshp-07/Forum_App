"use client"

import { useRouter } from 'next/navigation';
import { getAllCategories, getAllTags } from '@/lib/actions/category.action';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Page = ({params} : {params: any}) => {
    const { type } = params; 
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (type === 'tags') {
          const allTags = await getAllTags();
          setData(allTags);
        } else if (type === 'categories') {
          const tagsData = await getAllCategories();
          setData(tagsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchData();
    }
  }, [type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold'>All {type === 'categories' ? 'Categories' : 'Tags'}</h1>
    
      <div className='my-5 flex flex-col gap-3'>
        {
            data.map((item: any) => (
                <Link key={item.id} href={type === 'categories' ? `category/${encodeURIComponent(item.title)}` : `tag/${encodeURIComponent(item.name)}`}>
                    <div className='flex gap-5 items-center'>
                        <div className='text-lg font-medium hover:font-semibold'>
                            {
                                type === 'categories' ? item.title : `#${item.name}`
                            }
                        </div>
                        <div className='font-semibold'>
                            {item.threadCount} threads
                        </div>
                    </div>
                </Link>
            ))
        }
      </div>
    </div>
  );
};

export default Page;
