import { app } from '../../app';
import request from 'supertest';

describe('Get interests', () => {
	it('should return a list of interests', async () => {
		const res = await request(app).get('/api/users/interests').send().expect(200);
		const modelRes = {
			interests: [
				{
					category: 'Business',
					interests: ['Marketing', 'Business Case', 'Startup', 'Ecommerce'],
				},
				{
					category: 'Technology',
					interests: ['Coding', 'Web Builder', 'ChatBot', 'FinTech'],
				},
				{
					category: 'Design',
					interests: ['Graphic', 'UXUI', 'Ads', 'Fashion'],
				},
			],
		};
        expect(res.body).toEqual(modelRes);
	});
});
