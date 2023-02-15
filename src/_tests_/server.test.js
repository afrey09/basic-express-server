'use strict';

const supertest = require('supertest');
const { app } = require('../server');
const request = supertest(app);

describe('API Server', () => {
  it('should handle missing requests', async () => {
    const response = await request.get('/invalid');
    expect(response.status).toEqual(404);
  });

  it('handles bad method', async () => {
    const response = await request.post('/invalid');

    expect(response.status).toEqual(404);
    
  });
  

  it('handles no name', async () => {
    const response = await request.get('/person').query({name: ''});

    expect(response.status).toEqual(500);
  });

  it('handles name exists', async () => {
    const response = await request.get('/person').query({name: 'George'});

    expect(response.status).toEqual(200);

    expect(response.body.name).toEqual('George');
  });
});
