import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindUniqueArgs>()({
    where:{
        id:""
    },
    include:{
        comments:{
            where:{
                OR:[],
                AND:[],
                NOT:[]
            }
        }
    }
})
export default preparedQuery