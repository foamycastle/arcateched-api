import {Prisma} from "@prisma/client";

const preparedQuery = (machineId:string,attachmentId:string) => {
    return Prisma.validator<Prisma.machine_dataUpdateArgs>()({
        where:{
            id: machineId
        },
        data:{
            attachments:{
                delete:{
                    id: attachmentId
                }
            },
            timestampObject:{
                update:{
                    modifiedAt:new Date()
                }
            }
        },
        select:{
            id:true
        }
    })
}
export default preparedQuery