import { Prisma } from "@prisma/client";
import {prismaClient} from "../../prisma/prismaClient";

export default async function (id:string|null, user?:string){
    if (!id) return null;
    const updateObject:Prisma.timestampUpdateArgs={
        where:{
            id:id
        },
        data:{
            lastAccess: new Date()
        }
    }
    if(user){
        updateObject.data.lastAccessBy = user
    }
    return prismaClient.timestamp.update(updateObject)
}