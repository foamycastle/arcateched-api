import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindManyArgs>()({
    where:{
        modelNumber:{

        }
    },
    select:{
        id:true,
        name:true,
        modelNumber:true
    }
})
export default preparedQuery