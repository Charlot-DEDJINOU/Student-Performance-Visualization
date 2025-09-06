import { act } from "@testing-library/react-native";
import { useStudentStore } from "../stores/useStudentStore";
import { studentService } from "../services/studentService";

jest.mock("../services/studentService");

const mockSvc = studentService as jest.Mocked<typeof studentService>;

beforeEach(() => {
  const { getState, setState } = useStudentStore;
  setState({ ...getState(), classProfile: null, students: [], loading: false, error: null, searchQuery: "" }, true);
});

test("fetchStudents sets students", async () => {
  mockSvc.getStudents.mockResolvedValueOnce([{ id: "s1", name: "John", strands: {} } as any]);
  await act(async () => {
    await useStudentStore.getState().fetchStudents();
  });
  expect(useStudentStore.getState().students.length).toBe(1);
  expect(useStudentStore.getState().loading).toBe(false);
});

test("getFilteredStudents filters by searchQuery", () => {
  useStudentStore.setState({ searchQuery: "jo" });
  const filtered = useStudentStore.getState().getFilteredStudents([
    { studentId: "1", name: "John", competence: "ME" as any },
    { studentId: "2", name: "Jane", competence: "AE" as any },
  ]);
  expect(filtered).toHaveLength(1);
});