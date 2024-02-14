import Prisma from "@prisma/client";
import {prismaClient} from "../../../../prisma/prismaClient";

export default async function (state:Prisma.opState){
    return prismaClient.machine_data.findMany({
        where:{
            opState:state
        },
        select:{
            id:true,
            name:true
        }
    })
}