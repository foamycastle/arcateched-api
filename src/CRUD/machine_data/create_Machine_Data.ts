import {Prisma} from "@prisma/client";
import {prismaClient} from "../../prisma/prismaClient";

export default async function (data:Prisma.machine_dataCreateInput){
    const timestamp=new Date();
    return prismaClient.machine_data.upsert({
        where:{
            serialNumber:data.serialNumber
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
