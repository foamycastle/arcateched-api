import {prismaClient} from "../../../../../prisma/prismaClient";
import {select_complete_record} from "../../queryObjects/select_complete_record";
import {Prisma} from "@prisma/client";

export default async function (idCollection:Array<string>){
    let orArray:Array<Prisma.machine_dataWhereUniqueInput> = []
    for(const currentId of idCollection){
        orArray.push(
            {id:currentId}
        )
    }
    return prismaClient.machine_data.findMany({
        where:{
            OR:orArray
        },
        select:select_complete_record
    })

}