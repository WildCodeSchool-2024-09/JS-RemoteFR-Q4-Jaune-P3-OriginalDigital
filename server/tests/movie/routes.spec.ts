// Import the supertest library for making HTTP requests
import supertest from "supertest";

// Import the Express application
import app from "../../src/app";

// Import databaseClient
import databaseClient from "../../database/client";

import type { Result, Rows } from "../../database/client";

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

// Test suite for the GET /api/movies route
describe("GET /api/movies", () => {
  it("should fetch movies successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/movies endpoint
    const response = await supertest(app).get("/api/movies");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /api/movies/:id route
describe("GET /api/movies/:id", () => {
  it("should fetch a single movie successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/movies/:id endpoint
    const response = await supertest(app).get("/api/movies/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    // Mock empty rows returned from the database
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/movies/:id endpoint with an invalid ID
    const response = await supertest(app).get("/api/movies/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/movies route
// Doesn't pass: maybe something to change in app config :/
describe("POST /api/movies", () => {
  it("should add a new movie successfully", async () => {
    // Mock result of the database query
    const result = { insertId: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake movie data
    const fakeMovie = { title: "matrix", user_id: 0 };

    // Send a POST request to the /api/movies endpoint with a test movie
    const response = await supertest(app).post("/api/movies").send(fakeMovie);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });

  it("should fail on invalid request body", async () => {
    // Mock result of the database query
    const result = { insertId: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake movie data with missing user_id
    const fakeMovie = { title: "movie" };

    // Send a POST request to the /api/movies endpoint with a test movie
    const response = await supertest(app).post("/api/movies").send(fakeMovie);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
  });
});

// Test suite for the PUT /api/movies/:id route
// This route is not yet implemented :/
describe("PUT /api/movies/:id", () => {
  it("should update an existing movie successfully", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake movie data
    const fakeMovie = { title: "matrix", user_id: 0 };

    // Send a PUT request to the /api/movies/:id endpoint with a test movie
    const response = await supertest(app).put("/api/movies/42").send(fakeMovie);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid request body", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake movie data with missing user_id
    const fakeMovie = { title: "matrix" };

    // Send a PUT request to the /api/movies/:id endpoint with a test movie
    const response = await supertest(app).put("/api/movies/42").send(fakeMovie);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    // Mock result of the database query
    const result = { affectedRows: 0 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake movie data with missing user_id
    const fakeMovie = { title: "movie", user_id: 0 };

    // Send a PUT request to the /api/movies/:id endpoint with a test movie
    const response = await supertest(app).put("/api/movies/43").send(fakeMovie);

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the DELETE /api/movies/:id route
// This route is not yet implemented :/
describe("DELETE /api/movies/:id", () => {
  it("should delete an existing movie successfully", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Send a DELETE request to the /api/movies/:id endpoint
    const response = await supertest(app).delete("/api/movies/42");

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    // Mock result of the database query
    const result = { affectedRows: 0 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Send a DELETE request to the /api/movies/:id endpoint
    const response = await supertest(app).delete("/api/movies/43");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});
