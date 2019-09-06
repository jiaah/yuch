jest.mock('../services/userService');

const request = require('supertest');
const app = require('../app');
const userService = require('../services/userService');
const util = require('../lib/util');

describe('login', () => {
  it('should throw error if not exist user', async () => {
    userService.findOneByUsername.mockResolvedValue(null);
    const response = await request(app)
      .post('/api/auth/login')
      .send('username=notUser&password=yuch2009ung');
    expect(response.status).toBe(404);
  });

  it('should throw error if not matched password', async () => {
    userService.findOneByUsername.mockResolvedValue({
      password: '$2a$10$2M8E.vPCN7vRjoA/UiyZfOtjItc/S.wgvYNZXhT1MP4avPEkqR1ea',
    });
    const response = await request(app)
      .post('/api/auth/login')
      .send('username=yuch&password=uch2009ung');
    expect(response.status).toBe(409);
  });

  it('should response ok with body if not matched password', async () => {
    userService.findOneByUsername.mockResolvedValue({
      id: 'ca236d5a-331a-45dd-af80-09889b3380a6',
      username: 'yuch',
      password: '$2a$10$2M8E.vPCN7vRjoA/UiyZfOtjItc/S.wgvYNZXhT1MP4avPEkqR1ea',
    });
    const response = await request(app)
      .post('/api/auth/login')
      .send('username=yuch&password=yuch2009ung');
    expect(response.status).toBe(200);
  });
});

describe('logout', () => {
  it('should response with empty refresh token', async () => {
    userService.emptyRefreshToken.mockResolvedValue(true);
    const token = await util.getRandomToken({
      id: 'ca236d5a-331a-45dd-af80-09889b3380a6',
      username: 'yuch',
    });
    const response = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});

describe('refresh access token', () => {
  it('should get error if not send token in header', async () => {
    const response = await request(app).post('/api/auth/refresh');
    expect(response.status).toBe(500);
  });

  it('should get error if not valid token', async () => {
    const response = await request(app)
      .post('/api/auth/refresh')
      .send('refreshToken=foobar');
    expect(response.status).toBe(500);
  });

  it('should get error if valid token but not exist user', async () => {
    userService.isValid.mockResolvedValue(false);
    const response = await request(app)
      .post('/api/auth/refresh')
      .send(
        'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhMjM2ZDVhLTMzMWEtNDVkZC1hZjgwLTA5ODg5YjMzODBhNiIsImNyZWF0ZWRBdCI6MTU2NzY5NzEyMDgwNywiaWF0IjoxNTY3Njk3MTIwfQ.IR_ADRu1b6TqvDKI954mF3sq1Z0sjmxEg0GUVKVyZnI',
      );
    expect(response.status).toBe(401);
  });

  it('should get new token if valid token & user', async () => {
    userService.isValid.mockResolvedValue(true);
    userService.findOneById.mockResolvedValue({
      id: 'ca236d5a-331a-45dd-af80-09889b3380a6',
      username: 'yuch',
      companyName: '유청',
      isAdmin: true,
    });
    userService.reNewRefreshToken.mockResolvedValue(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhMjM2ZDVhLTMzMWEtNDVkZC1hZjgwLTA5ODg5YjMzODBhNiIsImNyZWF0ZWRBdCI6MTU2NzY5NzEyMDgwNywiaWF0IjoxNTY3Njk3MTIwfQ.IR_ADRu1b6TqvDKI954mF3sq1Z0sjmxEg0GUVKVyZnI',
    );
    const response = await request(app)
      .post('/api/auth/refresh')
      .send(
        'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhMjM2ZDVhLTMzMWEtNDVkZC1hZjgwLTA5ODg5YjMzODBhNiIsImNyZWF0ZWRBdCI6MTU2NzY5NzEyMDgwNywiaWF0IjoxNTY3Njk3MTIwfQ.IR_ADRu1b6TqvDKI954mF3sq1Z0sjmxEg0GUVKVyZnI',
      );
    expect(response.status).toBe(200);
  });
});
