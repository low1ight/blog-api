import {LikeStatus} from "../../../types/models/comment/like-status-input-model";

export const likeEnumValidator = async (value:string) => {

    if(value in LikeStatus) {
        return true
    }

    throw new Error(`Invalid value: ${value}`);

}