import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "../config/env";
import { studentService } from "../services/studentService";

const server = setupServer(
  http.get(`${API_BASE_URL}/class_profile`, () =>
    HttpResponse.json({ strands: [] }, { status: 200 })
  ),
  http.get(`${API_BASE_URL}/students`, () =>
    HttpResponse.json([{ id: "s1", name: "John", strands: {} }], { status: 200 })
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("getClassProfile succeeds", async () => {
  const cp = await studentService.getClassProfile();
  expect(cp.strands).toEqual([]);
});

test("getStudents returns array", async () => {
  const s = await studentService.getStudents();
  expect(s[0].id).toBe("s1");
});

test("handles server error", async () => {
  server.use(
    http.get(`${API_BASE_URL}/students`, () =>
      HttpResponse.text("Server error", { status: 500 })
    )
  );
  await expect(studentService.getStudents()).rejects.toThrow();
});