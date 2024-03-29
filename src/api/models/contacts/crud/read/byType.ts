import {prismaClient} from "../../../../../prisma/prismaClient";
import Prisma from "@prisma/client";

export default async function (type:Prisma.contactType[]){
    return prismaClient.contacts.findMany({
        where:{
            type:{
                hasEvery:type
            }
        },
        select:{
            id:true,
            name:true
        }
    })
}