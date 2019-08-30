jest.mock('../services/userService');

const request = require('supertest');
const app = require('../app');
const userService = require('../services/userService');

describe('refresh token', () => {
  it('should get error if not send token in header', async () => {
    const response = await request(app).post('/api/auth/refresh');
    expect(response.status).toBe(500);
  });

  it('should get error if not valid token', async () => {
    const response = await request(app)
      .post('/api/auth/refresh')
      .set('Authorization', 'Bearer foobar');
    expect(response.status).toBe(500);
  });

  it('should get error if valid token but not exist user', async () => {
    userService.isValid.mockResolvedValue(false);
    const response = await request(app)
      .post('/api/auth/refresh')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhMjM2ZDVhLTMzMWEtNDVkZC1hZjgwLTA5ODg5YjMzODBhNiIsInVzZXJuYW1lIjoieXVjaCIsImlhdCI6MTU2NzA4OTg2MCwiZXhwIjoxNTY3MDkzNDYwfQ.pX6gb4Cf5LU8zvx9cvtTbUsgcUzP0SPl_Sc6Cb_sdxU',
      );
    expect(response.status).toBe(401);
  });

  it('should get new token if valid token & user', async () => {
    userService.isValid.mockResolvedValue(true);
    userService.findOneById.mockResolvedValue({
      id: 'ca236d5a-331a-45dd-af80-09889b3380a6',
      username: 'yuch',
    });
    const response = await request(app)
      .post('/api/auth/refresh')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhMjM2ZDVhLTMzMWEtNDVkZC1hZjgwLTA5ODg5YjMzODBhNiIsInVzZXJuYW1lIjoieXVjaCIsImlhdCI6MTU2NzA4OTg2MCwiZXhwIjoxNTY3MDkzNDYwfQ.pX6gb4Cf5LU8zvx9cvtTbUsgcUzP0SPl_Sc6Cb_sdxU',
      );
    expect(response.status).toBe(200);
  });
});
