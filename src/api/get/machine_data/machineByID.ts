import {prismaClient} from "../../../prisma/prismaClient";
import {select_machine_data_all} from "../../../queryObjects/select_machine_data_all";

export default async function machineByID(id:string){
    return prismaClient.machine_data.findFirstOrThrow({
        where: {
            id: id
        },
        select:select_machine_data_all
    })
}