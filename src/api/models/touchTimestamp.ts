import {prismaClient} from "../../prisma/prismaClient";
import {Prisma} from "@prisma/client";
import {GetFindResult} from "@prisma/client/runtime/library";

export default function (timestampId:string){
    return prismaClient.timestamp.upsert({
        where:{
            id:timestampId
        },
        create:{
            createdAt:new Date()
        },
        update:{
            lastAccess:new Date()
        }
    })
}