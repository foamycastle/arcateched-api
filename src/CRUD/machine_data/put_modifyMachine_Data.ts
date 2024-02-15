import {prismaClient} from "../../prisma/prismaClient";
import {Prisma} from "@prisma/client";

export default async function (input:Prisma.machine_dataUpdateInput){
    const recordId = input.id
    delete input.id
    const updateObject:Prisma.machine_dataUpdateArgs={
        where:{
            id:<string>recordId
        },
        data:{
            ...input,
            timestampObject:{
                upsert:{
                    create:{createdAt:new Date},
                    update:{modifiedAt:new Date}
                }
            }
        },
        select:{
            id:true,
            name:true
        }
    }

    return prismaClient.machine_data.update(updateObject)

}