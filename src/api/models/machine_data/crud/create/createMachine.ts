import {Prisma} from "@prisma/client";
import {prismaClient} from "../../../../../prisma/prismaClient";

export default async function createMachine(payload:Prisma.machine_dataCreateInput) {
    return prismaClient.machine_data.create({
        data: payload
    })
}