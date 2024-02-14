import {prismaClient} from "../../../prisma/prismaClient";
import {Prisma} from "@prisma/client";

export default async function (input){
    const recordId = input.id
    delete input.id
    const updateObject:Prisma.machine_dataUpdateArgs={
        where:{
            id:recordId
        },
        data:{
            ...input,
            timestamp_machine_data_timestampTotimestamp:{
                upsert:{
                    create:{createdAt:new Date},
                    update:{modifiedAt:new Date}
                }
            }
        },
        select:{
            id:true,
            gameName:true
        }
    }

    return prismaClient.machine_data.update(updateObject)

}