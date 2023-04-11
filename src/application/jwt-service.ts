import jwt from 'jsonwebtoken'
import {settings} from "../settings";
import {AccessTokenPayloadData} from "../types/models/jwt/AccessTokenPayloadData";
import {TokensType} from "../types/models/jwt/TokensType";

export const jwtService = {

    async createNewTokens(userId:string,sessionId:string,deviceId:string):Promise<TokensType> {


        const accessToken = jwt.sign({userId},settings.JWT_SECRET,{expiresIn:'1h'})

        const refreshToken = jwt.sign({userId,sessionId,deviceId},settings.JWT_SECRET,{expiresIn:'1h'})


        return {accessToken,refreshToken}


    },



    async getUserIdFromAccessToken(token:string):Promise<AccessTokenPayloadData | null> {

           return await jwt.verify(token,settings.JWT_SECRET) as AccessTokenPayloadData

    }



}


