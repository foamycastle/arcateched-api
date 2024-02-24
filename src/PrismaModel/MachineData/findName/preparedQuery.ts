import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindManyArgs>()({
    where:{
        name:{

        }
    },
    select:{
        id:true,
        name:true
    }
})
export default preparedQuery