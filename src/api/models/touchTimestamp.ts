import {prismaClient} from "../../prisma/prismaClient";

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