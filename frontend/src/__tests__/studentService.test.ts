import MockAdapter from "axios-mock-adapter";
import { http } from "../services/api";
import { API_BASE_URL } from "../config/env";
import { studentService } from "../services/studentService";

let mock: MockAdapter;

beforeAll(() => {
  mock = new MockAdapter(http, { onNoMatch: "throwException" });
});

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

test("getClassProfile succeeds", async () => {
  mock.onGet(`${API_BASE_URL}/class_profile`).reply(200, { strands: [] });
  const cp = await studentService.getClassProfile();
  expect(cp.strands).toEqual([]);
});

test("getStudents returns a valid array of students", async () => {
  mock.onGet(`${API_BASE_URL}/students`).reply(200, [
    {
      id: "student1",
      name: "John Doe",
      strands: {
        letterIdentification: { competence: "ME", progress: 75 },
        letterNaming: { competence: "AE", progress: 50 },
        letterFormation: { competence: "BE", progress: 30 },
        phonemicAwareness: { competence: "EE", progress: 90 },
      },
    },
    {
      id: "student2",
      name: "Jane Smith",
      strands: {
        letterIdentification: { competence: "AE", progress: 60 },
        letterNaming: { competence: "ME", progress: 80 },
        letterFormation: { competence: "ME", progress: 75 },
        phonemicAwareness: { competence: "AE", progress: 55 },
      },
    },
  ]);

  const students = await studentService.getStudents();

  expect(Array.isArray(students)).toBe(true);

  expect(students[0]).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    strands: expect.any(Object),
  });

  expect(Object.keys(students[0].strands)).toEqual(
    expect.arrayContaining([
      "letterIdentification",
      "letterNaming",
      "letterFormation",
      "phonemicAwareness",
    ])
  );

  expect(students[0].strands.letterIdentification).toMatchObject({
    competence: expect.any(String),
    progress: expect.any(Number),
  });

});

test("handles server error", async () => {
  mock.onGet(`${API_BASE_URL}/students`).reply(500, "Server error");
  await expect(studentService.getStudents()).rejects.toThrow();
});