import { User, Interest } from "../models";

import { BadRequestError } from '@cuconnex/common';



export const getUserWhoLike =  async (interest : string | undefined) : Promise<User[]> => {
    if(!interest){
        return User.findAll();
    }else{
        const fetchedInterest = await Interest.findOne({ where : { description : interest }});
        if(!fetchedInterest){
            throw new Error('Interest is not existed')
        }
        return fetchedInterest.getLike();
    }
}