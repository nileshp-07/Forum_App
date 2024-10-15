import { formatDate } from '@/lib/utils';
import React from 'react'

const Thread = ({thread} : {thread : any}) => {
  console.log("Thread : ",thread);
  const {createdBy, title, category, tags,  createdAt} = thread;
  return (
      <div className='my-5 border-b-2 w-full border py-5 px-8 rounded-md shadow-md'>
          <div className='font-semibold'>Username : {createdBy?.username}</div>

          <p className='text-2xl font-medium'>{title}</p>
          <div>Category: {category?.title}</div>
          <div className='flex justify-between mt-2'>
            <div className='flex gap-3'>
              {
                tags?.map((item: any) => (
                  <div key={item?.id}
                  className='bg-gray-300 py-1 px-2 rounded-full'>#{item?.tag?.name}</div>
                ))
              }
            </div>

            <div>
              {
                formatDate(createdAt)
              }
            </div>
          </div>
      </div>    
  )
}

export default Thread