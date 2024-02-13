import {prismaClient} from "../../../prisma/prismaClient";

export default async function allManufacturers(){
    return prismaClient.contacts.findMany({
        where:{
            ctType:{
                has:'Manufacturer'
            }
        },
        select:{
            id:true,
            ctName:true
        }
    })
}