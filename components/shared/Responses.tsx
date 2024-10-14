import { formatDate } from '@/lib/utils'
import React from 'react'

const Responses = ({responses} : {responses : any}) => {
    console.log("responses: ",responses)
  return (
    <div className='flex flex-col gap-7 my-10 '>
        {
            responses.map((response: any) => (
                <div key={response.id} 
                 className='border shadow-lg py-3 px-5'>
                    <div className='flex justify-between'>
                       <div className='font-semibold'>{response?.author?.username}</div>
                       <div>{formatDate(response?.createdAt)}</div>
                    </div>
                    <div className='text-lg'>
                        {
                            response?.body
                        }
                    </div>
                </div>  
            ))
        }
    </div>
  )
}

export default Responses