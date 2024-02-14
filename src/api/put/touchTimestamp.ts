import { Prisma } from "@prisma/client";
import {prismaClient} from "../../prisma/prismaClient";

export default async function (id:string|null, user?:string, modified?:boolean){
    if (!id) return null;
    const timestamp=new Date()
    const updateObject:Prisma.timestampUpsertArgs={
        where:{
            id:id
        },
        update:{
            lastAccess:timestamp
        },
        create:{
            createdAt:timestamp
        }
    }
    if(user){
        updateObject.update.lastAccessBy = user
    }
    if(modified){
        updateObject.update.modifiedAt = timestamp
    }
    return prismaClient.timestamp.upsert(updateObject)
}