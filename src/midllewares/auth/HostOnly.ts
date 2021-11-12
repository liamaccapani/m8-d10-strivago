import createHttpError from "http-errors"
import { Request, Response, NextFunction} from 'express'

export const HostOnly = async (req: Request, res: Response, next: NextFunction) => {
    if(req.user!.role === "Host"){
        next() 
    } else {
        next(createHttpError(403, "Host only :["))
    }
}