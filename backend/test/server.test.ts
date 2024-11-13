import Prisma from "../src/db";
import { server } from "../src/server";

const mockEntry = {
  title: "Test Entry",
  description: "This is a test entry",
  created_at: new Date(),
  scheduled_date: new Date(),
};

let createdEntryId: string;

beforeAll(async () => {
  await Prisma.$connect();
  await server.ready();
});

afterAll(async () => {
  await Prisma.$disconnect();
  await server.close();
});

describe("server test", () => {
  it("should create a new entry", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: mockEntry,
    });

    expect(response.statusCode).toBe(200);

    const createdEntry = JSON.parse(response.payload);
    expect(createdEntry).toHaveProperty("id");
    expect(createdEntry.id).toHaveLength(36);
    expect(createdEntry.title).toBe(mockEntry.title);
    expect(createdEntry.description).toBe(mockEntry.description);
    expect(createdEntry.created_at).toBe(mockEntry.created_at.toISOString());

    createdEntryId = createdEntry.id; // get the id for later tests
  });

  it("should retrieve all of the entries", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);

    const entries = JSON.parse(response.payload);
    expect(entries).toBeInstanceOf(Array);
    expect(entries.length).toBeGreaterThan(0);
  });

  it("should retrieve an entry by ID", async () => {
    const response = await server.inject({
      method: "GET",
      url: `/get/${createdEntryId}`,
    });

    expect(response.statusCode).toBe(200);
    const entry = JSON.parse(response.payload);
    expect(entry).toHaveProperty("id", createdEntryId);
    expect(entry).toHaveProperty("title", mockEntry.title);
  });

  it("should update an entry by id", async () => {
    const updatedEntry = {
      title: "Updated Test Entry",
      description: "Updated description",
      created_at: new Date(),
      scheduled_date: new Date(),
    };

    const response = await server.inject({
      method: "PUT",
      url: `/update/${createdEntryId}`,
      payload: updatedEntry,
    });

    expect(response.statusCode).toBe(200);
    const updateMessage = JSON.parse(response.payload);
    expect(updateMessage).toHaveProperty("msg", "Updated successfully");

    // double check
    const getResponse = await server.inject({
      method: "GET",
      url: `/get/${createdEntryId}`,
    });
    const entry = JSON.parse(getResponse.payload);
    expect(entry.title).toBe(updatedEntry.title);
    expect(entry.description).toBe(updatedEntry.description);
  });

  it("should delete an entry by ID", async () => {
    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${createdEntryId}`,
    });

    expect(response.statusCode).toBe(200);
    const deleteMessage = JSON.parse(response.payload);
    expect(deleteMessage).toHaveProperty("msg", "Deleted successfully");

    const getResponse = await server.inject({
      method: "GET",
      url: `/get/${createdEntryId}`,
    });
    expect(getResponse.statusCode).toBe(500);
  });
});
