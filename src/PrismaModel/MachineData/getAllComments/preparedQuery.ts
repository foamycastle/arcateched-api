import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindFirstArgs>()({
    where:{
        id:""
    },
    select:{
        id:true,
        comments:{
            where:{
                 AND:[]
            },
            select:{
                id:true,
                content:true,
                timestampObject:{
                    select:{
                        createdAt:true,
                        modifiedAt:true
                    }
                }
            }
        }
    }
})
export default preparedQuery