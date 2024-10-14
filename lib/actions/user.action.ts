"use server"

import db from "../primsa/db";

export const createUser = async (user: any) => {
    try{
        const {clerkId, username, email} =user;
        const newUser = await db.user.create({
            data : {
                clerkId,
                username,
                email,
            }
        });

        return newUser;
    }
    catch(err)
    {
        console.log(err);
    }
}