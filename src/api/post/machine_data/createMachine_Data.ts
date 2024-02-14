import {Prisma} from "@prisma/client";
import {prismaClient} from "../../../prisma/prismaClient";

export default async function (data:Prisma.machine_dataCreateInput){

    return prismaClient.machine_data.create({
        data: {
            ...data,
            timestamp_machine_data_timestampTotimestamp:{
                create:{
                    createdAt:new Date()
                }
            }
        }

    })

}
