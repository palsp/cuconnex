import { app } from '../../app';
import request from 'supertest';
import { User , Rating } from '../../models';

const setupRater = async (id? : string ) => {
    
    const rater = await User.create({ id : id || "6131886621" , name : "rater"});
    return rater ;
}

const setupRatee = async (id? : string) => {
    const ratee = await User.create({ id : id || "6131886921" , name : "ratee"});
    return ratee ;
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
    
    it('should not return user who rating is true' , async () => {
        const rater = await setupRater();
        const ratee = await setupRatee();
        const ratee2 = await setupRatee("6131111121");
        await rater.addRatee(ratee , { through : { isRate : false,}});
        await rater.addRatee(ratee2 , { through : { isRate : true}});

        const {body} = await request(app)
            .get('/api/users/rate')
            .set('Cookie' , global.signin(rater.id))
            .send()

        expect(body.ratee.length).toEqual(1);
        expect(body.ratee[0].id).toEqual(ratee.id);
    });


})