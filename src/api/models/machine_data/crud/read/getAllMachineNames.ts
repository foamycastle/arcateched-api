import {MachineDataOp} from "../MachineDataOp";


export class getAllMachineNames extends MachineDataOp{
    constructor(routePath:string) {
        super();
        this.routeDefinition=routePath
        this.queryObject={
            select:{
                id:true,
                name:true
            }
        }
    }
    run(input?:object):Promise<any> {
        return this.prismaClient[this.model].findMany(this.queryObject)
    }


}