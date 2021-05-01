import request from 'supertest';
import { app } from '../../app';
import { getUserWhoLike } from '../../utils/recommend';
import { User, Interest, Team } from '../../models';
import { TeamStatus, Technology } from '@cuconnex/common';


const  createDummyUser =  async () : Promise<User[]> => {
    const users : User[] = [];
    for(let i = 0 ; i < 10 ; i++){
        users.push(await User.create({
            id : `6131776${i}21`,
            name : `test_user_${i}`
        }))
    }
    return users
}

const addInterestToDummyUsers = async (users : User[]) : Promise<void> => {

    let interests = await Interest.findAll();

    for(let i = 0 ; i < users.length ; i++){
        const max_interest = Math.floor( Math.random() * interests.length)
        for(let j = 0 ; j < max_interest ; j++){
            await users[i].addInterest(interests[j]);
        }
    }
}

const createTeamForDummyUsers = async ( users : User[]) : Promise<Team[]> => {
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

const createRecommendForDummyUsers = async (users : User[]) : Promise<void> => {
    for(let i = 0 ; i < users.length ; i++){
        for(let j = users.length ;  i < j ; j--){
            await users[i].addRecommendation(users[j], { through : {score : (Math.random() * 5).toFixed(2)}}) 
        }
    }
}

describe('getUserWhoLike' , () => {


    it('should return all user if undefined is passed to the function' , async () => { 
        const users = await createDummyUser()
        await addInterestToDummyUsers(users);
        const result = await getUserWhoLike(undefined);
        expect(result.length).toEqual(users.length);

    });

    it('should throw an error if invalid  interest is passed to the function' , async () => {
        await expect(getUserWhoLike("invalid")).rejects.toThrow('Interest is not existed')
    });

    it('should return all user if valid  interest is passed to the function' , async () => {
        const users = await createDummyUser()
        await addInterestToDummyUsers(users);
        const result = await getUserWhoLike(Technology.Coding);
        const codings = await Interest.findOne({where : { description : Technology.Coding}});
        expect((await codings!.getLike()).length).toEqual(result.length);
    });
})


describe( 'recommend User for team', () => {
    it('should return 404 if team is not found' , async () => {
        const users = await createDummyUser();

        await request(app)
            .get('/api/teams/recommend/not_found')
            .set('Cookie', global.signin(users[0].id))
            .expect(404);

    });

    it('should return 400 if invalid params is provided' , async () => {
        const users = await createDummyUser();
        const teams = await createTeamForDummyUsers(users);

        await request(app)
            .get(`/api/teams/recommend/${teams[0].name}?filter=invalid&filter=invalid`)
            .set('Cookie', global.signin(users[0].id))
            .expect(400);
    });

    it('should return all users except team members  rank by score if filter is not provided' , async () => {
        const users = await createDummyUser();
        const teams = await createTeamForDummyUsers(users);
        await createRecommendForDummyUsers(users);

        const {body} = await request(app)
        .get(`/api/teams/recommend/${teams[0].name}`)
        .set('Cookie' , global.signin(users[0].id))
        .send()

        expect(body.users.length).toEqual(5);
        // TODO: check for descending order

    });

});


// describe( 'recommend team for user', () => {

// });