import {prismaClient} from "../../../../prisma/prismaClient";
import Prisma from "@prisma/client";

export default async function gameByID(id:string){
    return prismaClient.machine_data.findFirstOrThrow({
        where: {
            id: id
        },
        select:{
            id:true,
            gameName:true,
            gameType:true,
            gameZone:true,
            modelNumber:true,
            serialNumber:true,
            dateOfMfg:true,
            dateEnter:true,
            dateExit:true,
            occupied:true,
            playerCount:true,
            keyCabinet:true,
            keyService:true,
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
                    users_timestamp_createdByTousers:{
                        select:{
                            id:true,
                            username:true,
                            user_display_name:true
                        }
                    },
                    lastAccess:true,
                    users_timestamp_lastAccessByTousers:{
                        select:{
                            id:true,
                            username:true,
                            user_display_name:true
                        }
                    },
                    modifiedAt:true,
                    users_timestamp_modifiedByTousers:{
                        select:{
                            id:true,
                            username:true,
                            user_display_name:true
                        }
                    },
                }
            }
        }
    })
}