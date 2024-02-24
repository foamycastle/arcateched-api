import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataUpdateArgs>()({
    where:{
        id:""
    },
    data:{
        comments:{
            create:{
                content:"",
                timestampObject:{
                    create:{
                        createdAt:new Date()
                    }
                }
            }
        }
    },
    select:{
        id:true,
        comments:{
            orderBy:{
                timestampObject:{
                    createdAt:'desc'
                }
            },
            take:1
        }
    }
})
export default preparedQuery