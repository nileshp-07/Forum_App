"use server"

import db from "../primsa/db";

export const getAllCategories = async() => {
    try {
      const categories = await db.category.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          threads: {
            select: {
              id: true,
            },
          },
        },
      });
  
      const CategoriesThreadCount = categories.map((category) => ({
        ...category,
        threadCount: category.threads.length,
      }));
  
      return CategoriesThreadCount;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }


export const getAllTags = async() => {
    try {
      const tags = await db.tag.findMany({
        select: {
          id: true,
          name: true,
          threads: {
            select: {
              threadId: true,
            },
          },
        },
      });
  
      const tagsWithThreadCount = tags.map((tag) => ({
        ...tag,
        threadCount: tag.threads.length,
      }));
  
      return tagsWithThreadCount;
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }