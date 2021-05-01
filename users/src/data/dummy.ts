import { Interest, User } from "../models"

export const init = async () => {
    let users : User[] = [];
    for(let i = 0 ; i < 10 ; i++){
        users[i] = await User.create({ id : `6131886${i}21`, name : `test_${i}`});
    }

    let interests = await Interest.findAll();

    for(let i = 0 ; i < users.length ; i++){
        const max_interest = Math.floor( Math.random() * interests.length)
        for(let j = 0 ; j < max_interest ; j++){
            await users[i].addInterest(interests[j]);
        }
    }

    for(let i = 0 ; i < users.length ; i++){
        for(let j = users.length ;  i < j ; j--){
            await users[i].addRecommendation(users[j], { through : {score : (Math.random() * 5).toFixed(2)}}) 
        }
    }
}