import {Prisma} from "@prisma/client";

const preparedQuery = (machineId:string,commentId:string) => {
    return Prisma.validator<Prisma.machine_dataUpdateArgs>()({
        where:{
            id:machineId
        },
        data:{
            comments:{
                update:{
                    where:{
                        id: commentId
                    },
                    data:{

                    }
                },
                delete:{
                    id: commentId
                }
            }
        },
        select:{
            id:true
        }
    })
}
export default preparedQuery