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
        zone:true,
        attachments:{
            select:{
                id:true,label:true,path:true
            }
        },
        comments:true
    }
})
export default preparedQuery;