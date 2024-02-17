import {Prisma} from "@prisma/client";
import {prismaClient} from "../../../../../prisma/prismaClient";

export default function createMachine(payload:Prisma.machine_dataCreateInput) {
    const dateNow = new Date()
    if(!payload.dateEnter){
        payload.dateEnter=dateNow
    }
    if(!payload.timestampObject){
        payload.timestampObject=<Prisma.timestampCreateNestedOneWithoutMachine_dataInput>{
            create:{
                createdAt:dateNow
            }
        }
    }
    return prismaClient.machine_data.create({
        data: payload
    })
}