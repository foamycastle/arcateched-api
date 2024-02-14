import {prismaClient} from "../../../prisma/prismaClient";

export default async function allMachineNames(){
    return prismaClient.machine_data.findMany({
        select: {
            id: true,
            name: true
        },
        orderBy: {
            name: 'asc'
        }
    })
}