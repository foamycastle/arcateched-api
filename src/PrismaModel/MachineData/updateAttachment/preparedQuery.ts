import {Prisma} from "@prisma/client";

const preparedQuery = (machineId:string,attachmentId:string,data:Prisma.attachmentsCreateInput) => {
    return Prisma.validator<Prisma.machine_dataUpdateArgs>()({
        where:{
            id:machineId
        },
        data:{
            attachments: {
                update:{
                    where:{
                        id:attachmentId
                    },
                    data:{
                        ...data,
                        timestampObject:{
                            update:{
                                modifiedAt:new Date()
                            }
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