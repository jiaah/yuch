const request = require('supertest');
const app = require('../app');

describe('/diag/json', async () => {
  it('should get sample json', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});
