"use server"

import db from "../primsa/db"


export const createThread = async({title, userId, categoryId, tagIds} : any) => {
    try{
       const newThread = await db.thread.create({
             data : {
                title,
                userId,
                categoryId
             }
       });

       await Promise.all(
        tagIds.map(async (tagId:any) => {
          await db.threadTag.create({
            data: {
              threadId: newThread.id,
              tagId,
            },
          });
        })
      );

       return newThread;
    }
    catch(err)
    {
        console.log("Error", err);
    }
}


export const getAllThreads = async (page = 1, limit = 10) => {
    const skipThread = (page - 1) * limit;

    const [threads, totalCount] = await Promise.all([
        db.thread.findMany({
            skip: skipThread,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                createdBy: {
                    select: {
                        username: true, 
                    },
                },
                tags: {
                  include: {
                    tag: true,
                  },
                }, 
                category : true
            },
        }),
        db.thread.count(),
    ]);

    return {
        threads,
        totalPages: Math.ceil(totalCount / limit),
    };
};


export const getThreadsByTag = async (tagName: string) => {
  try {
    const threads = await db.thread.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: tagName, 
            },
          },
        },
      },
      include: {
        tags: {
          include: {
            tag: true, // Include the tag details
          },
        },
        category: true,
        createdBy: true
      },
    });

    return threads;
  } catch (error) {
    console.error("Error fetching threads by tag:", error);
    throw new Error("Could not fetch threads");
  }
};

export const getThreadsByCategory = async (categoryName: string) => {
  console.log("CategoryName;",  categoryName);
  try {
    const threads = await db.thread.findMany({
      where: {
        category: {
          title: categoryName,
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        }, 
        category: true, 
        createdBy: true,
      },
    });

    return threads;
  } catch (error) {
    console.error("Error fetching threads by category:", error);
  }
};

export const getThreadById = async(threadId: string) => {
  try {
    const thread = await db.thread.findUnique({
      where: { id: threadId },
      include: {
        category: true, 
        tags: {
          include: {
            tag: true, 
          },
        },
        createdBy: true,
        responses: true
      },
    });

    if (!thread) {
      throw new Error('Thread not found');
    }

    return thread;
  } catch (error) {
    console.error('Error fetching thread:', error);
  }
}


export async function createResponse(threadId: string, userId: string, body: string) {
  try {
    const newResponse = await db.response.create({
      data: {
        body,
        userId,
        threadId,
      },
    });

    return newResponse;
  } catch (error) {
    console.error('Error creating response:', error);
  }
}



export const getAllResponses= async(threadId: string) => {
  try {
    const responses = await db.response.findMany({
      where: {
        threadId,
      },
      include: {
        author: true
      },
      orderBy: {
        createdAt: 'asc', 
      },
    });

    return responses; 
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw new Error('Error fetching responses');
  }
}


export const getThreadsByUserId = async (userId: string, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const threads = await db.thread.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        createdBy: true
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip, 
      take: limit, 
    });

    const totalThreads = await db.thread.count({
      where: {
        userId,
      },
    });

    const totalPages = Math.ceil(totalThreads / limit);

    return {
      threads,
      totalPages, 
    };
  } catch (error) {
    console.error('Error fetching threads by user ID:', error);
  }
};
