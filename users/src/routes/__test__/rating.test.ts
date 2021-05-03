import { app } from '../../app';
import request from 'supertest';
import { User , Rating, Team,Event } from '../../models';
import { TeamStatus, } from '@cuconnex/common';
import { EventStatus } from '@cuconnex/common/build/db-status/event';



const setupRater = async (id? : string ) => {
    
    const rater = await User.create({ id : id || "6131886621" , name : "rater"});
    return rater ;
}

const setupRatee = async (id? : string) => {
    const ratee = await User.create({ id : id || "6131886921" , name : "ratee"});
    return ratee ;
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

describe('add rating' , () => {
    it('should return 404 if rater is not existed' , async () => {
        const {body} = await request(app)
                .post('/api/users/rate')
                .set('Cookie',global.signin())
                .send()
                .expect(400);
        expect(body.errors[0].message).toEqual('Please fill the information form first.')
                
    });

    it('should return 400 if rating is not between 0 and 5 inclusive' , async () => {
        const rater = await setupRater();
        await request(app)
            .post('/api/users/rate')
            .set('Cookie',global.signin(rater.id))
            .send({
                rateeId : "6131897221",
                rating : 5.1
            })
            .expect(400);


    });

    it('should return 400 if ratee is not existed' , async() => {
        const rater = await setupRater();
        await request(app)
        .post('/api/users/rate')
        .set('Cookie',global.signin(rater.id))
        .send({
            rateeId : "6131897221",
            ratings : 4.9
        })
        .expect(400);


    });

    it('should return 400 if ratee rate himself' , async() => {
        const rater = await setupRater();
        const {body}= await request(app)
        .post('/api/users/rate')
        .set('Cookie',global.signin(rater.id))
        .send({
            rateeId : rater.id,
            ratings : 4.9
        })
        .expect(400);

    });


    it('should not allow user to rate if rate is not existed yet' , async () => {
        const rater = await setupRater();
        const ratee = await setupRatee();
        await request(app)
        .post('/api/users/rate')
        .set('Cookie',global.signin(rater.id))
        .send({
            rateeId : ratee.id,
            ratings : 4.9
        })
        .expect(400)

    
    });

    it('should add new rating rating exist but not been rated yet' , async () => {
        const rater = await setupRater();
        const ratee = await setupRatee();
        await rater.addRatee(ratee , { through : { isRate : false}})
        await request(app)
        .post('/api/users/rate')
        .set('Cookie',global.signin(rater.id))
        .send({
            rateeId : ratee.id,
            ratings : 4.9
        })
        .expect(201)
    
      const rate = await Rating.findOne({ where : { raterId : rater.id , rateeId : ratee.id}});
      expect(rate).not.toBeNull();
      expect(rate!.rating).toEqual(4.9)
      expect(rate!.isRate).toEqual(true)
    });

    it('should return 404 if update rating if previous rating is existed' , async() => {
        const rater = await setupRater();
        const ratee = await setupRatee();
        await rater.addRatee(ratee , { through : { rating : 4.6 , isRate : true}});
        const newRating = 3.5

        const {body} = await request(app)
        .post('/api/users/rate')
        .set('Cookie',global.signin(rater.id))
        .send({
            rateeId : ratee.id,
            ratings : newRating
        })
        .expect(201)
    
      const rate = await Rating.findAll({ where : { raterId : rater.id , rateeId : ratee.id}});
      expect(rate).toHaveLength(1);
      expect(rate![0].rating).toEqual(newRating);
    });
});


describe('get Rating' ,  () => {
    

    it('should return 400 if team not found' , async () => {
        const rater = await setupRater();

        const {body} = await request(app)
            .get('/api/users/rate/not_found')
            .set('Cookie' , global.signin(rater.id))
            .send()
            .expect(400)
        
        expect(body.errors[0].message).toEqual('Team not existed')

    });


    it('should return 400 if users is not a member of the team' , async () => {
        const users = await createDummyUser()

        const team = await users[0].createTeams({ name : "teat_team_1" , description : "this is great"});
        await team.addMember(users[1] , {through : { status : TeamStatus.Reject , sender : 'team'}});

        const {body} = await request(app)
        .get(`/api/users/rate/${team.name}`)
        .set('Cookie' , global.signin(users[1].id))
        .send()
        .expect(400)
              
    expect(body.errors[0].message).toEqual('You must be a part of the team in order to rate team members')

    });

    it('should not include users in the returned users' , async () => {
        const users = await createDummyUser()

        const team = await users[0].createTeams({ name : "teat_team_1" , description : "this is great"});
        await team.addMember(users[1] , {through : { status : TeamStatus.Accept , sender : 'team'}});

        const {body} = await request(app)
        .get(`/api/users/rate/${team.name}`)
        .set('Cookie' , global.signin(users[1].id))
        .send()
        .expect(200)

        expect(body.ratees.length).toEqual(1)
        expect(body.ratees[0].id).not.toEqual(users[1].id);
    });

    it('should not return any members if all of them are rated ' , async () => {
        const users = await createDummyUser()

        const team = await users[0].createTeams({ name : "teat_team_1" , description : "this is great"});
        await team.addMember(users[1] , {through : { status : TeamStatus.Accept , sender : 'team'}});

        await users[1].addRatee(users[0] , { through : { isRate : true}});

        const {body} = await request(app)
        .get(`/api/users/rate/${team.name}`)
        .set('Cookie' , global.signin(users[1].id))
        .send()
        .expect(200)

        expect(body.ratees.length).toEqual(0)
    });

})


describe('get team rate' , () => {


    it('should return only team that participate in an event that is closed' , async () => {

        const users = await createDummyUser()
        
        const ongoingTeam = await users[0].createTeams({ name : "teat_team_1" , description : "this should not be included"});
        const closedTeam = await users[0].createTeams({ name : "teat_team_2" , description : "this should be included"});

        await ongoingTeam.addMember(users[1] , {through : { status : TeamStatus.Accept , sender : 'team'}});
        await closedTeam.addMember(users[2], {through : {  status : TeamStatus.Accept, sender : 'team' }});


        const ongoing = await Event.create({
            id : 1,
            eventName : "test_event",
            registration : true,
            status : EventStatus.ongoing,
        })

        const closed = await Event.create({
            id : 2,
            eventName : "test_event_2",
            registration : false,
            status : EventStatus.closed,
        })
        
        await ongoingTeam.register(ongoing);
        await closedTeam.register(closed);
        const {body} =await request(app)
            .get('/api/users/teams/rate')
            .set('Cookie' , global.signin(users[0].id))
            .send({})
            .expect(200)

        expect(body.teams).toHaveLength(1);
        expect(body.teams[0].name).toEqual(closedTeam.name);

    });

    it('should not return team that all members is rated' , async () => {
        const users = await createDummyUser();
        const closedTeam = await users[0].createTeams({ name : "teat_team_2" , description : "this should be included"});
        const closed = await Event.create({
            id : 2,
            eventName : "test_event_2",
            registration : false,
            status : EventStatus.closed,
        });

        await closedTeam.addMember(users[2], {through : {  status : TeamStatus.Accept, sender : 'team' }});

        await users[0].addRatee(users[2] , { through : { isRate : true }})

        await closedTeam.register(closed);

        const {body} =await request(app)
            .get('/api/users/teams/rate')
            .set('Cookie' , global.signin(users[0].id))
            .send({})

        expect(body.teams.length).toEqual(0);
    })




    it('should return users team ' , async () => {
        const users = await createDummyUser()
        const team = await createTeamForDummyUsers(users)
        const event = await Event.create({
            id : 1,
            eventName : "test_event",
            registration : false,
            status : EventStatus.closed,
        })

        await team[0].register(event)
        const {body} =await request(app)
            .get('/api/users/teams/rate')
            .set('Cookie' , global.signin(users[0].id))
            .send({})

        expect(body.teams.length).toEqual(1);
    })

});
