"use client"

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MultiSelect } from '../ui/Multiselect'
import { Button } from '../ui/button'
import { getAllCategories, getAllTags } from '@/lib/actions/category.action'
import { createUser } from '@/lib/actions/user.action'
import { createThread } from '@/lib/actions/thread.action'
import { useRouter } from 'next/navigation'


const CreateThread = ({closeModal} : {closeModal : () => void}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
     title : "",
     categoryId : "",
     tagIds : []
  })
  const [tags, setTags] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const userId = "670cfc4564aa08b93aea2032";

  const tagList = tags.map((tag: any) => ({
    label: tag.name,
    value: tag.id,
  }));

  

  useEffect(() => {
    const getCategoriesAndTags = async() => {
      const allCategories =await getAllCategories();
      setCategories(allCategories)
  
      const allTags = await getAllTags();
      setTags(allTags)
    }
    
    getCategoriesAndTags();
  }, [])


  const handleCreateThread = async(e : any) => {
      e.preventDefault();

      await createThread({...formData, userId});

      closeModal();
  }
  

  const handleTagsChange = (data: any) => {
     setFormData(prev => (
        {
           ...prev,
           tagIds : data
        }
     ))
  }

  console.log("formData :", formData);

  return (
    <div>
       <h2 className='font-medium text-lg mb-5'>Create a new Thread</h2>

       <form onSubmit={handleCreateThread}>
          <div>
            <Label htmlFor='title'>Title</Label>
            <Input
              type='text'
              name= "title"
              value={formData.title}
              placeholder='Enter thread title'
              onChange={(e) => setFormData(prev => ({...prev , title: e.target.value}))}
            />
          </div>

          <div className='mt-3'>
            <Label htmlFor='categoryId'>Category</Label>
            <Select
              name='categoryId'
              onValueChange={(value) => setFormData((prev) => ({...prev, categoryId: value}))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {
                   categories.map((category:any) => (
                     <SelectItem value={category.id} key={category.id}>{category.title}</SelectItem>
                   ))
                }
              </SelectContent>
            </Select>
          </div>
         
          <div className='mt-3'>
            <Label htmlFor='tags'>Tags</Label>

            <MultiSelect
              options={tagList}
              onValueChange={handleTagsChange}
              defaultValue={formData.tagIds}
              placeholder="Select frameworks"
              variant="inverted"
            />
            
          </div>

          <Button className='mt-5'>
             Create
          </Button>
       </form>
    </div>
  )
}

export default CreateThread