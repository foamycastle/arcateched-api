import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindManyArgs>()({
    where:{
        gameType:{
            hasSome:[]
        }
    },
    select:{
        id:true,
        name:true,
        gameType:true
    }
})
export default preparedQuery