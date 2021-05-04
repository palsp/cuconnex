import request from 'supertest';
import { app } from '../../app';
import { getUserWhoLike } from '../../utils/recommend';
import { User, Interest, Team, Event } from '../../models';
import { FriendStatus, TeamStatus, Technology } from '@cuconnex/common';

import { EventStatus } from '@cuconnex/common/build/db-status/event';
import { floor } from 'lodash';
import { Connection } from '../../models/connection.model';

const  createDummyUser =  async (num: number = 10) : Promise<User[]> => {
    const users : User[] = [];
    for(let i = 0 ; i < num ; i++){
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

const createEventForTeam = async (teams : Team[]) : Promise<Event> => {
    const event = await Event.create({
        id : 1,
        eventName : "test_event",
        status : EventStatus.ongoing,
        registration : true,
    });

    for(let team of teams){
        await team.register(event);
    }

    return event;
}

const createRecommendForDummyUsers = async (users : User[]) : Promise<void> => {
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
            .get('/api/teams/recommend-user/not_found')
            .set('Cookie', global.signin(users[0].id))
            .expect(404);
    });

    it('should return 400 if invalid params is provided' , async () => {
        const users = await createDummyUser();
        const teams = await createTeamForDummyUsers(users);

        await request(app)
            .get(`/api/teams/recommend-user/${teams[0].name}?filter=invalid&filter=invalid`)
            .set('Cookie', global.signin(users[0].id))
            .expect(400);
    });

    it('should return all users except team members  rank by score if filter is not provided' , async () => {
        const users = await createDummyUser();
        const teams = await createTeamForDummyUsers(users);
        await createRecommendForDummyUsers(users);
        const {body} = await request(app)
        .get(`/api/teams/recommend-user/${teams[0].name}`)
        .set('Cookie' , global.signin(users[0].id))
        .send()

        expect(body.users.length).toEqual(5);
        const recommendUser = body.users
        expect(recommendUser[0].id).toEqual(users[5].id)
        expect(recommendUser[1].id).toEqual(users[9].id)
        expect(recommendUser[2].id).toEqual(users[8].id)
        expect(recommendUser[3].id).toEqual(users[7].id)
        expect(recommendUser[4].id).toEqual(users[6].id)

    });

});


describe( 'recommend team for user by event', () => {
    it('should return 404 if team is not found' , async () => {
        const user = await User.create({
            id : "6131776621",
            name : "dummy_user",
        });
        await request(app)
            .get('/api/users/recommend-team/2')
            .set('Cookie' , global.signin(user.id))
            .send()
            .expect(404)
    })

    it('should return empty array if team is empty' , async () => {
        const user = await User.create({
            id : "6131776621",
            name : "dummy_user",
        });
        await Event.create({
            id : 1,
            eventName : "dummy_event",
            registration: true,
            status : EventStatus.ongoing
        })
        const {body} = await request(app)
        .get('/api/users/recommend-team/1')
        .set('Cookie' , global.signin(user.id))
        .send();

        expect(body.teams.length).toEqual(0);
    });

    it('should not return the team where user is in' , async () => {
        const users = await createDummyUser();
        const teams = await createTeamForDummyUsers(users);
        await createEventForTeam(teams);
        await createRecommendForDummyUsers(users);
        const {body} = await request(app)
        .get('/api/users/recommend-team/1')
        .set('Cookie' , global.signin(users[0].id))
        .send();
        
        expect(body.teams.length).toEqual(1);
        expect(body.teams[0].name).toEqual(teams[1].name);
    });

    
    it('should return team rank by score' , async () => {
        const users = await createDummyUser();
        const teams = await createTeamForDummyUsers(users);
        await createEventForTeam(teams);

        const dummyUser = await User.create({
            id : "613176621",
            name : "dummy_user"
        });


        //  all members of the first team will be recommended to dummyUser with score of one and
        //  all members of the second team will be recommended to dummyUser with score of five
        //  therefore, second team will be recommended first 
        let c = 1
        for(let i = 0 ; i < users.length ; i++){
            if(i === 5){
                c = 5;
            }
            await dummyUser.addRecommendation(users[i] , { through : { score : c}})
        }


        const {body} = await request(app)
        .get('/api/users/recommend-team/1')
        .set('Cookie' , global.signin(dummyUser.id))
        .send();
        
        expect(body.teams).toHaveLength(2);
        expect(body.teams[0].name).toEqual(teams[1].name);
        expect(body.teams[1].name).toEqual(teams[0].name);

    });

    it('should not return team that is not participate in the event' , async () => {
        const users = await createDummyUser();
        const teams = await createTeamForDummyUsers(users);
        await createEventForTeam(teams);

        const dummyUser = await User.create({
            id : "613176621",
            name : "dummy_user"
        });

        const t = await dummyUser.createTeams({ name : "dummy_team" , description : "idk"});
        const e = await Event.create({ id : 2 , status : EventStatus.ongoing, eventName : "dummy_event" , registration : true});
        await t.register(e);
        
        const {body} = await request(app)
            .get('/api/users/recommend-team/1')
            .set('Cookie' , global.signin(dummyUser.id))
            .send();

        expect(body.teams.length).toEqual(2);
        expect(body.teams[0].name).not.toEqual(e.eventName);
        expect(body.teams[1].name).not.toEqual(e.eventName);
    })


});

describe('recommend user for user' ,  () => {
    it('should return all users except sender' , async () => {
        const users = await createDummyUser(4);
        await users[0].addRecommendation(users[1] , { through: { score : 5}})
        await users[0].addRecommendation(users[2] , { through: { score : 3}})
        await users[0].addRecommendation(users[3] , { through: { score : 4}})

        const {body} = await request(app)
            .get('/api/users/recommend-user')
            .set('Cookie', global.signin(users[0].id))
            .send()
            .expect(200);

        expect(body.users.length).toEqual(3);
        expect(body.users[0].id).toEqual(users[1].id)
        expect(body.users[1].id).toEqual(users[3].id)
        expect(body.users[2].id).toEqual(users[2].id)


    });

    it('should not include connection is recommend list' , async () => {
        const users = await createDummyUser(2);
         await users[0].addConnection(users[1] , { through : { status : FriendStatus.Accept}});


        const {body} = await request(app)
            .get('/api/users/recommend-user')
            .set('Cookie', global.signin(users[0].id))
            .send()
            .expect(200);

            expect(body.users.length).toEqual(0);


    });
});



describe('recommend team for user' , () => {
        it('should not return the team where user is in' , async () => {
        const users = await createDummyUser();
        const teams = await createTeamForDummyUsers(users);
        await createRecommendForDummyUsers(users);
        const {body} = await request(app)
        .get('/api/users/recommend-team')
        .set('Cookie' , global.signin(users[0].id))
        .send();
        
        expect(body.teams.length).toEqual(1);
        expect(body.teams[0].name).toEqual(teams[1].name);
    });

        it('should return team rank by score' , async () => {
        const users = await createDummyUser();
        const teams = await createTeamForDummyUsers(users);

        const dummyUser = await User.create({
            id : "613176621",
            name : "dummy_user"
        });


        //  all members of the first team will be recommended to dummyUser with score of one and
        //  all members of the second team will be recommended to dummyUser with score of five
        //  therefore, second team will be recommended first 
        let c = 1
        for(let i = 0 ; i < users.length ; i++){
            if(i === 5){
                c = 5;
            }
            await dummyUser.addRecommendation(users[i] , { through : { score : c}})
        }


        const {body} = await request(app)
        .get('/api/users/recommend-team')
        .set('Cookie' , global.signin(dummyUser.id))
        .send();
        
        expect(body.teams).toHaveLength(2);
        expect(body.teams[0].name).toEqual(teams[1].name);
        expect(body.teams[1].name).toEqual(teams[0].name);
    })
});
