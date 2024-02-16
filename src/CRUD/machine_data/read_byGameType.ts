import Prisma from "@prisma/client";
import {prismaClient} from "../../prisma/prismaClient";

export default async function (gameType: Prisma.$Enums.gameType[]){

    return prismaClient.machine_data.findMany({
        where: {
            gameType:{
                hasEvery:gameType
            }
        },
        select:{
            id:true,
            name:true,
            gameType:true
        }
    })
}