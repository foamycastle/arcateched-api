import {prismaClient} from "../../prisma/prismaClient";
import Prisma from '@prisma/client'
import {when} from "joi";
import {select_machine_data_all} from "../../queryObjects/select_machine_data_all";

export default async function (listOfIDs:Array<Prisma.machine_data['id']>){
    let idBlocks:Array<Prisma.Prisma.machine_dataWhereInput>=[]
    for(const id of listOfIDs){
        idBlocks.push(
            {id: id}
        )
    }
    const queryObject:Prisma.Prisma.machine_dataFindManyArgs={
        where:{
            OR:idBlocks
        },
        select:select_machine_data_all
    }
    return prismaClient.machine_data.findMany(queryObject)

}