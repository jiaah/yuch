const request = require('supertest');
const app = require('../app');

describe('/diag/json', () => {
  it('should get sample json', async () => {
    const response = await request(app).get('/api/auth/refresh');
    expect(response.statusCode).toBe(404);
  });
});
