import {AccessTokenPayloadData} from "./models/jwt/AccessTokenPayloadData";
import {LikeDBModel} from "./models/like/Like-DB-model";


declare global {
    declare namespace Express {
        export interface Request {
            authUserData:AccessTokenPayloadData | null
            userActivity:LikeDBModel[] | null
        }
    }
}