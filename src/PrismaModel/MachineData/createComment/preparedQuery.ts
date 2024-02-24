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
    }
})
export default preparedQuery