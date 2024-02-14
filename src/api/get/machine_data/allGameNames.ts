import {prismaClient} from "../../../prisma/prismaClient";

export default async function allGameNames(){
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