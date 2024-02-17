import {Prisma} from "@prisma/client";
import {prismaClient} from "../../../../../prisma/prismaClient";

export default function byId(IdString:string) {
    return prismaClient.contacts.findFirstOrThrow({
        where:{
            id:IdString
        },
        include:{
            contacts_addresses:{
                select:{
                    streetNumber:true,
                    streetAddress1:true,
                    streetAddress2:true,
                    streetUnit:true,
                    postalcode:true,
                    territory:true,
                    country:true,
                    label:true,
                }
            },
            contacts_phone:{
                select:{
                    countryCode:true,
                    areaCode:true,
                    regionCode:true,
                    extCode1:true,
                    extCode2:true,
                    lineExtension:true,
                    label:true,
                    name:true,
                }
            },
            contacts_internet:true,
            attachments:{
                select:{
                    id:true
                }
            },
            comments:{
                select:{
                    content:true,
                }
            },
            machine_data:{
                select:{
                    id:true,
                    name:true
                }
            }
        }
    })
}