import {Prisma} from "@prisma/client";

const timeObject=new Date()
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
                        createdAt:timeObject
                    }
                }
            }
        },
        timestampObject:{
            update:{
                modifiedAt:timeObject
            }
        }
    },
    select:{
        id:true,
        comments:{
            select:{
                id:true,
                content:true
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
export default preparedQuery