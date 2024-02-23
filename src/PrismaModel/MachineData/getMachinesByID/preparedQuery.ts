import {Prisma} from "@prisma/client";

let preparedQuery = Prisma.validator<Prisma.machine_dataFindManyArgs>()({
    where:{
        OR:[]
    },
    select:{
        id:true,name:true,modelNumber:true,serialNumber:true,
        gameType:true,opState:true,playerCount:true,occupied:true,
        dateEnter:true,dateOfMfg:true,dateExit:true,
        cabinetKey:true,
        serviceKey:true,
        machine_zones:true,
        contacts:{
            select:{
                id:true,name:true,type:true,
                contacts_addresses:true,contacts_phone:true,contacts_internet:true
            }
        },
        attachments:{
            select:{
                id:true,label:true,path:true
            }
        },
        comments:true,
        issues:true,
        todo:true
    }
})
export default preparedQuery;