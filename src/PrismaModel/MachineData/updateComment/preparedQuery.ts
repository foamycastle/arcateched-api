import {Prisma} from "@prisma/client";
const dateObject=new Date()
const preparedQuery= (machineId:string,commentId:string,content:string) => {
    return Prisma.validator<Prisma.machine_dataUpdateArgs>()({
        where:{
            id:machineId
        },
        data:{
            comments:{
                update:{
                    where:{
                        id:commentId
                    },
                    data:{
                        content:content,
                        timestampObject:{
                            update:{
                                modifiedAt:dateObject
                            }
                        }
                    }
                }
            },
            timestampObject:{
                update:{
                    modifiedAt:dateObject
                }
            }
        },
        select:{
            id:true,
            comments:{
                where:{
                    id:commentId
                },
                select:{
                    id:true,
                    content:true
                }
            }
        }
    })
}

export default preparedQuery