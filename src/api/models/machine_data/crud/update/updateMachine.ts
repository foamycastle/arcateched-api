import {Prisma} from "@prisma/client";
import {prismaClient} from "../../../../../prisma/prismaClient";

export default async function updateMachine(payload:Prisma.machine_dataUpdateInput) {

    const recordId = payload.id
    delete payload.id
    const updateObject:Prisma.machine_dataUpdateArgs={
        where:{
            id:<string>recordId
        },
        data:{
            ...payload,
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
