const request = require('supertest');
const app = require('./app'); // Assuming your Express app is exported from app.js

describe("GET statistic", () => {
  
  it("should return the volleyball statistics", async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/volleyball/statistic');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the structure and content of the response

    // For example, if you expect the response to be an array of statistics
    expect(Array.isArray(response.body)).toBe(true);
    // You can also check specific properties of the returned statistics
    expect(response.body.length).toBeGreaterThan(0);
    // Assert on individual statistic properties as needed
  });

  it("should return the handball statistics", async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/handball/statistic');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the structure and content of the response

    // For example, if you expect the response to be an array of statistics
    expect(Array.isArray(response.body)).toBe(true);
    // You can also check specific properties of the returned statistics
    expect(response.body.length).toBeGreaterThan(0);
    // Assert on individual statistic properties as needed
  });

  it("should return the football statistics", async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/football/statistic');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the structure and content of the response

    // For example, if you expect the response to be an array of statistics
    expect(Array.isArray(response.body)).toBe(true);
    // You can also check specific properties of the returned statistics
    expect(response.body.length).toBeGreaterThan(0);
    // Assert on individual statistic properties as needed
  });
});


describe("GET players", () => {

  it("should return the volleyball players", async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/volleyball/players');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the structure and content of the response

    // For example, if you expect the response to be an array of statistics
    expect(Array.isArray(response.body)).toBe(true);
    // You can also check specific properties of the returned statistics
    expect(response.body.length).toBeGreaterThan(0);
    // Assert on individual statistic properties as needed
  });

  it("should return the handball players", async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/handball/players');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the structure and content of the response

    // For example, if you expect the response to be an array of statistics
    expect(Array.isArray(response.body)).toBe(true);
    // You can also check specific properties of the returned statistics
    expect(response.body.length).toBeGreaterThan(0);
    // Assert on individual statistic properties as needed
  });

  it("should return the football players", async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/football/players');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the structure and content of the response

    // For example, if you expect the response to be an array of statistics
    expect(Array.isArray(response.body)).toBe(true);
    // You can also check specific properties of the returned statistics
    expect(response.body.length).toBeGreaterThan(0);
    // Assert on individual statistic properties as needed
  });
});

describe("GET teams", () => {

  it("should return the volleyball teams", async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/volleyball/teams');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the structure and content of the response

    // For example, if you expect the response to be an array of statistics
    expect(Array.isArray(response.body)).toBe(true);
    // You can also check specific properties of the returned statistics
    expect(response.body.length).toBeGreaterThan(0);
    // Assert on individual statistic properties as needed
  });

  it("should return the handball players", async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/handball/teams');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the structure and content of the response

    // For example, if you expect the response to be an array of statistics
    expect(Array.isArray(response.body)).toBe(true);
    // You can also check specific properties of the returned statistics
    expect(response.body.length).toBeGreaterThan(0);
    // Assert on individual statistic properties as needed
  });

  it("should return the football players", async () => {
    jest.setTimeout(30000);
    const response = await request(app).get('/football/teams');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add more assertions based on the structure and content of the response

    // For example, if you expect the response to be an array of statistics
    expect(Array.isArray(response.body)).toBe(true);
    // You can also check specific properties of the returned statistics
    expect(response.body.length).toBeGreaterThan(0);
    // Assert on individual statistic properties as needed
  });
});
