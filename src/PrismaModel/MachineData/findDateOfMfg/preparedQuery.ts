import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindManyArgs>()({
    where:{
        dateOfMfg:{

        }
    },
    select:{
        id:true,
        name:true,
        dateOfMfg:true
    }
})
export default preparedQuery