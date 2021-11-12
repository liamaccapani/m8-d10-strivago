import { UserDocument } from "../src/types/interfaces"

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument
        }
    }
}