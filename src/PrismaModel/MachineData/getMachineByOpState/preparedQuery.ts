import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindManyArgs>()({
    where:{
        OR:[]
    },
    select:{
        id:true,
        name:true,
        opState:true
    }
})
export default preparedQuery