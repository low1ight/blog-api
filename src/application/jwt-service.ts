import jwt from 'jsonwebtoken'
import {settings} from "../settings";
import {AccessTokenPayloadData} from "../types/models/jwt/AccessTokenPayloadData";

export const jwtService = {

    async createNewTokens(userId:string):Promise<string> {
        return jwt.sign({userId},settings.JWT_SECRET,{expiresIn:'2m'})
    },
    
    
    async getUserIdFromAccessToken(token:string):Promise<AccessTokenPayloadData | null> {

        try {

           return jwt.verify(token,settings.JWT_SECRET) as AccessTokenPayloadData


        } catch {

            return null

        }

    }



}


