"use client"

import Responses from '@/components/shared/Responses';
import Thread from '@/components/shared/Thread';
import { Input } from '@/components/ui/input';
import { createResponse, getAllResponses, getThreadById } from '@/lib/actions/thread.action';
import React, { useEffect, useState } from 'react'

const ThreadDetails = ({params} : {params: any}) => {
    const [threadDetails, setThreadDetails] = useState<any>({})
    const [responses, setResponses] = useState<any>([])
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState("")
    const {id} = params;
    const userId = "670cfc4564aa08b93aea2032";  // As there is some issue with the deployement so i can't setup the webhook for the clerk that's why using the temporaray userId


    const getThreadDetails = async() => {
        const thread = await getThreadById(id);

        setThreadDetails(thread);
        console.log("Thread Details: ", thread);
    }

    const handleCreateResponse = async(e: any) => {
       e.preventDefault();
       
       setLoading(true);
       const newReponse = await createResponse(id,userId,reply);
      
       setReply("")
       console.log(newReponse)

       if(newReponse)
       {
         setResponses((prev: any) => (
           [
             ...prev,
             newReponse
           ]
         ))
       }

       setLoading(false);
    }

    const getResponsesHandler = async () => {
      const res = await getAllResponses(id);

      if(res)
         setResponses(res);
    }

    useEffect(() => {
        setLoading(true)
        getThreadDetails()

        getResponsesHandler();
        setLoading(false);
    },[])

    if(loading)
    {
      return (
        <div>
          Loading...
        </div>
      )
    }
  return (
    <div>
        <Thread thread={threadDetails}/>
        
        <form onSubmit={handleCreateResponse}>
          <Input
            autoFocus
            type='text'
            name= "reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder='Enter the Reply'
            className='w-full'
          />
        </form>

        <Responses responses={responses}/>
    </div>
  )
}

export default ThreadDetails;