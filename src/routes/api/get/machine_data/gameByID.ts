import {prismaClient} from "../../../../prisma/prismaClient";

export default async function gameByID(id:string){
    return prismaClient.machine_data.findFirstOrThrow({
        where: {
            id: id
        },
        include:{
            contacts:true,
            attachments:true,
            issues:true,
            comments:true,
            keys_machine_data_cabinetKeyTokeys:true,
            keys_machine_data_serviceKeyTokeys:true,
            timestamp_machine_data_timestampTotimestamp:true,
            todo:true,
            machine_zones:true
        }
    })
}