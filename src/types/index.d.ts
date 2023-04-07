import {AccessTokenPayloadData} from "./models/jwt/AccessTokenPayloadData";


declare global {
    declare namespace Express {
        export interface Request {
            authUserData:AccessTokenPayloadData | null
        }
    }
}