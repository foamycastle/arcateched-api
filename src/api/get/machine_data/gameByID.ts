import {prismaClient} from "../../../prisma/prismaClient";
import Prisma from "@prisma/client";

export default async function gameByID(id:string){
    return prismaClient.machine_data.findFirstOrThrow({
        where: {
            id: id
        },
        select:{
            id:true,
            name:true,
            gameType:true,
            gameZone:true,
            modelNumber:true,
            serialNumber:true,
            dateOfMfg:true,
            dateEnter:true,
            dateExit:true,
            occupied:true,
            playerCount:true,
            cabinetKey:true,
            serviceKey:true,
            attachments:true,
            contacts:true,
            issues:true,
            todo:true,
            opState:true,
            comments:true,
            timestampObject: {
                select:{
                    id:true,
                    createdAt:true,
                    user_createdBy:{
                        select:{
                            id:true,
                            username:true,
                            displayName:true
                        }
                    },
                    lastAccess:true,
                    user_lastAccessBy:{
                        select:{
                            id:true,
                            username:true,
                            displayName:true
                        }
                    },
                    modifiedAt:true,
                    user_modifiedBy:{
                        select:{
                            id:true,
                            username:true,
                            displayName:true
                        }
                    },
                }
            }
        }
    })
}