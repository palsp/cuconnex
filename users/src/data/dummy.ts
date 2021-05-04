import { TeamStatus } from "@cuconnex/common";
import { EventStatus } from "@cuconnex/common/build/db-status/event";
import { Interest, User, Event, Team } from "../models"

// export const init = async () => {
//     let users : User[] = [];
//     for(let i = 0 ; i < 10 ; i++){
//         users[i] = await User.create({ id : `6131886${i}21`, name : `test_${i}`});
//     }

//     const event = await Event.create({
//         id : 1,
//         eventName : "test_event",
//         registration : true,
//     });

//     for(let i = 0 ; i < users.length ; i++){
//         if( i === 0 || i === 5) {
//             const team = await users[i].createTeams({ name : `test_team_${i}` , description : "test team"})
//             for(let j = i + 1 ; j < i + 5 ; j++){
//                 await team.addMember(users[j] , { through : { status : TeamStatus.Accept , sender : 'team'}});
//             }
//             team.register(event);
//         }
//     }

//     let interests = await Interest.findAll();

//     for(let i = 0 ; i < users.length ; i++){
//         const max_interest = Math.floor( Math.random() * interests.length)
//         for(let j = 0 ; j < max_interest ; j++){
//             await users[i].addInterest(interests[j]);
//         }
//     }

//     for(let i = 0 ; i < users.length ; i++){
//         for(let i = 0 ; i < users.length ; i++){
//             let c = 0;
//             for(let j = users.length ;  j >= 0 ; j--){
//                 if(c === 5){
//                     c = 0;
//                 }
//                 if(j === i){
//                     continue;
//                 }
//                 await users[i].addRecommendation(users[j], { through : {score : c}}) 
//                 c++;
//             }
//         }
//     }
// }


export const init = async () => {
    const users = await createDummyUser();
    await addInterestToDummyUsers(users);
    const teams = await createTeamForDummyUsers(users);
    await createEventForTeam(teams)
    await createRecommendForDummyUsers(users);
}
export const  createDummyUser =  async () : Promise<User[]> => {
    const users : User[] = [];
    for(let i = 0 ; i < 10 ; i++){
        users.push(await User.create({
            id : `6131776${i}21`,
            name : `test_user_${i}`
        }))
    }
    return users
}

export const addInterestToDummyUsers = async (users : User[]) : Promise<void> => {

    let interests = await Interest.findAll();

    for(let i = 0 ; i < users.length ; i++){
        const max_interest = Math.floor( Math.random() * interests.length)
        for(let j = 0 ; j < max_interest ; j++){
            await users[i].addInterest(interests[j]);
        }
    }
}

export const createTeamForDummyUsers = async ( users : User[]) : Promise<Team[]> => {
    let teams: Team[] = [];
    for(let i = 0 ; i < users.length ; i++){
        if( i === 0 || i === 5) {
            const team = await users[i].createTeams({ name : `test_team_${i}` , description : "test team"})
            for(let j = i + 1 ; j < i + 5 ; j++){
                await team.addMember(users[j] , { through : { status : TeamStatus.Accept , sender : 'team'}});
            }
            teams.push(team);
        }
    }

    return teams;
}

export const createEventForTeam = async (teams : Team[]) : Promise<Event> => {
    const event = await Event.create({
        id : 1,
        eventName : "test_event",
        registration : true,
        status : EventStatus.ongoing
    });

    for(let team of teams){
        await team.register(event);
    }

    return event;
}

export const createRecommendForDummyUsers = async (users : User[]) : Promise<void> => {
    for(let i = 0 ; i < users.length ; i++){
        let c = 0;
        for(let j = 0 ;  j < users.length ; j++){
            if(c === 5){
                c = 0;
            }
            if(j === i){
                continue;
            }
            await users[i].addRecommendation(users[j], { through : {score : c }}) 
            c++;
        }
    }

}