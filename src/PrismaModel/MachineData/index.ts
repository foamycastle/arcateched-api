import {PrismaModel, PrismaModelTypes} from "../index";
import {Prisma} from "@prisma/client";

type MachineNamesReturn={
    id:string
    name:string
}
export abstract class MachineData extends PrismaModel{
    constructor() {
        super()
        this.prismaModel=this.prismaClient.machine_data
    }

}