import jwt from 'jsonwebtoken'
import {settings} from "../settings";
import {AccessTokenPayloadData} from "../types/models/jwt/AccessTokenPayloadData";
import {TokensType} from "../types/models/jwt/TokensType";
import {createCustomResponse, CustomResponse} from "../utils/errors/custromErrorObj/createCustomResponse";
import {RefreshTokenPayloadData} from "../types/models/jwt/RefreshTokenPayloadData";
import {DeviceRepository} from "../repository/device/device-repository";

export class JwtService  {


    constructor(protected deviceRepository:DeviceRepository) {
    }

    async createNewTokens(userId:string,sessionId:string,deviceId:string):Promise<TokensType> {


        const accessToken = jwt.sign({userId},settings.JWT_SECRET,{expiresIn:'15m'})

        const refreshToken = jwt.sign({userId,sessionId,deviceId},settings.JWT_SECRET,{expiresIn:'60m'})


        return {accessToken,refreshToken}


    }




    async getUserIdFromAccessToken(token:string):Promise<AccessTokenPayloadData | null> {

           return await jwt.verify(token,settings.JWT_SECRET) as AccessTokenPayloadData

    }



    async verifyRefreshToken(refreshToken:string):Promise<CustomResponse<RefreshTokenPayloadData>> {

        try {

            //verify refresh token and get payload data
            let jwtPayload:RefreshTokenPayloadData = await jwt.verify(refreshToken,settings.JWT_SECRET) as RefreshTokenPayloadData

            //get current sessionId for token security
            const currentDeviceSessionId:string | null = await this.deviceRepository.getCurrentDeviceSessionId(jwtPayload.deviceId)


            //validate sessionId
            if(!currentDeviceSessionId) return createCustomResponse(false,401,"find security err")

            if(jwtPayload.sessionId !== currentDeviceSessionId) return createCustomResponse(false,401,"refresh token expired")

            return createCustomResponse(true,200,jwtPayload)

        } catch(e:any) {

            return createCustomResponse(false,401,e.message)

        }
    }



}


