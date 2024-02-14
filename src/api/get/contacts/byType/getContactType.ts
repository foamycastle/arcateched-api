import {prismaClient} from "../../../../prisma/prismaClient";
import Prisma from "@prisma/client";

export default async function getContactType(type:Prisma.contactType){
    return prismaClient.contacts.findMany({
        where:{
            type:{
                has:type
            }
        },
        select:{
            id:true,
            name:true
        }
    })
}