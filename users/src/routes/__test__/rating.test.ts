import { app } from '../../app';
import request from 'supertest';
import { User , Rating } from '../../models';

const setupRater = async () => {
    
    const rater = await User.create({ id : "6131886621" , name : "rater"});
    return rater ;
}

const setupRatee = async () => {
    const ratee = await User.create({ id : "6131886921" , name : "ratee"});
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

    it('should return 404 if add new rating if previous rating is not existed' , async () => {
        const rater = await setupRater();
        const ratee = await setupRatee();
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
    });


    it('should return 404 if update rating if previous rating is existed' , async() => {
        const rater = await setupRater();
        const ratee = await setupRatee();
        await rater.addRating(ratee , { through : { rating : 4.6}});
        const newRating = 3.5

        await request(app)
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
