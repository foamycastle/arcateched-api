import {JSONError} from "./errorObjects/JSONError";

export const bodyParserOptions = {

    type: "application/json",

    verify:(req,res,buf:Buffer,encoding:BufferEncoding)=>{
        try{
            req.body=JSON.parse(buf.toString())
            return true
        }catch (e){
            throw new JSONError(
                "The input body contained invalid JSON"
            )
        }
    }
}