import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindUniqueArgs>()({
    where:{
        id:""
    },
    include:{
        comments:true
    }
})
export default preparedQuery