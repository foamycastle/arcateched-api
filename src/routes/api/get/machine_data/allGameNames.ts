import {prismaClient} from "../../../../prisma/prismaClient";

export default async function allGameNames(){
    return prismaClient.machine_data.findMany({
        select: {
            id: true,
            gameName: true
        },
        orderBy: {
            gameName: 'asc'
        }
    })
}