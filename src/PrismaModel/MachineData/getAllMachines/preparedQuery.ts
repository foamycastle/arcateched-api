import {Prisma} from "@prisma/client";
import {modelNumber} from "../../../validation/model/MachineData";

const preparedQuery = () => {
    return Prisma.validator<Prisma.machine_dataFindManyArgs>()({
        select:{
            id:true,
            name:true,
            serialNumber:true,
            modelNumber:true,
            opState:true
        }
    })
}
export default preparedQuery