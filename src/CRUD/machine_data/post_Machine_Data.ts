import {Prisma} from "@prisma/client";
import {prismaClient} from "../../prisma/prismaClient";
import {not} from "joi";

export default async function (data:Prisma.machine_dataCreateInput){
    const timestamp=new Date();
    return prismaClient.machine_data.upsert({
        where:{
            name: data.name,
            serialNumber: data.serialNumber
        },
        create:{
            ...data,
            timestampObject:{
                create:{
                    createdAt:timestamp,
                    lastAccess:timestamp
                }
            }
        },
        update:{
            ...data,
            timestampObject:{
                update:{
                    modifiedAt:timestamp,
                    lastAccess:timestamp
                }
            }
        },
        select:{
            id:true,
            name:true
        }
    })

}
