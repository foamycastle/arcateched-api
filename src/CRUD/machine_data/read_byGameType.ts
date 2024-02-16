import Prisma from "@prisma/client";
import {prismaClient} from "../../prisma/prismaClient";

export default async function (type:Prisma.$Enums.gameType[]){
    return prismaClient.machine_data.findMany({
        where:{
            gameType: {
                hasEvery:type
            }
        },
        select:{
            id:true,
            name:true
        }
    })
}