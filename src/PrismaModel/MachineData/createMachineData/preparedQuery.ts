import {Prisma} from "@prisma/client";

const preparedQuery = (inputData) => {
    return Prisma.validator<Prisma.machine_dataCreateArgs>()({
        ...inputData,
        select:{
            id:true
        }

    })
}
export default preparedQuery