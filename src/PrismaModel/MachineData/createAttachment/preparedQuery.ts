import {Prisma} from "@prisma/client";

const preparedQuery = (machineId:string,args:Prisma.attachmentsCreateInput) => {
    return Prisma.validator<Prisma.machine_dataUpdateArgs>()({
        where:{
            id:machineId
        },
        data:{
            attachments:{
                create:{
                    ...args,
                    timestampObject:{
                        create:{
                            createdAt:new Date()
                        }
                    }
                }
            },
            timestampObject:{
                update:{
                    modifiedAt:new Date()
                }
            }
        },
        select:{
            id:true,
            attachments:{
                select:{
                    id:true,
                    label:true
                },
                orderBy:{
                    timestampObject:{
                        createdAt:'desc'
                    }
                },
                take:1
            }
        }
    })
}
export default preparedQuery