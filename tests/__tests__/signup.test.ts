import request from 'supertest';
import { app } from '../../src/app';

describe('POST /signup', () => {
    it('should create a new user', async () => {
        const response = await request(app).post('/auth/signup').send({
            name: 'John Doe',
            username: 'johnde',
            location: 'Nowhere',
            email: 'johndo@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });


        expect(response.status).toBe(204);
    });

    it('should return an error if required fields are missing', async () => {
        const response = await request(app).post('/auth/signup').send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
            'Campos obrigatórios não preenchidos!',
        );
    });
});
