import {AccessTokenPayloadData} from "./models/jwt/AccessTokenPayloadData";
import {UserActivity} from "./models/user/user-DB-type";


declare global {
    declare namespace Express {
        export interface Request {
            authUserData:AccessTokenPayloadData | null
            userActivity:UserActivity | null
        }
    }
}