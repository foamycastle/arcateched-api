import {prismaClient} from "../../prisma/prismaClient";
import Prisma from '@prisma/client'

export default async function (types:Array<Prisma.contactType>){
    return prismaClient.contacts.findMany({
        where:{
            type:{
                hasEvery:types
            }
        },
        select:{
            id:true,
            name:true
        }
    })
}