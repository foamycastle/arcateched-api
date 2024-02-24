import {NextFunction, Request, Response} from "express";

export class Helper {
    static verifyJSON(req:Request,res:Response,buffer:Buffer,enc:BufferEncoding):void{
        try{
            const tryParse=JSON.parse(buffer.toString(enc));
            if(typeof tryParse !== 'object'){
                //TODO: 400, Bad Request, JSON must be an object or array
                return
            }
        }catch (e){
            if(e instanceof SyntaxError){
                //TODO: 400, Bad Request, JSON could not be parsed
                return
            }
        }
    }
    static findBodyObjectHeader(req:Request,res:Response,next:NextFunction):void{
        if (!res.hasHeader('Arcateched-Body-Object')){
            //TODO: 400, Bad Request, request is missing appropriate headers
            return
        }
        next()
    }


}