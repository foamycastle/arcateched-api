import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindManyArgs>()({
    select:{
        id:true,
        name:true
    }
})

export default preparedQuery