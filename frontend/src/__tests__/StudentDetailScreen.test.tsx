import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import StudentDetailScreen from "../screens/StudentDetailScreen";
import { useStudentStore } from "../stores/useStudentStore";
import { Alert } from "react-native";

const mockAlert = () => jest.spyOn(Alert, "alert").mockImplementation(() => {});

const resetStore = () => {
  const { getState, setState } = useStudentStore;
  setState(
    {
      ...getState(),
      classProfile: null,
      students: [],
      loading: false,
      error: null,
      searchQuery: "",
    },
    true
  );
};

describe("StudentDetailScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
  });

  const renderWithNav = (studentId: string) =>
    render(
      <NavigationContainer>
        {/* @ts-expect-error simplification test */}
        <StudentDetailScreen route={{ params: { studentId } }} navigation={{ goBack: jest.fn() }} />
      </NavigationContainer>
    );

  test("affiche LoadingSpinner quand loading=true et aucun étudiant trouvé", () => {
    useStudentStore.setState({ students: [], loading: true, error: null });
    const { getByText } = renderWithNav("student1");
    expect(getByText("Loading student details...")).toBeTruthy();
  });

  test("affiche ErrorMessage et relance sur Retry", async () => {
    const clearError = jest.fn();
    const fetchStudents = jest.fn();

    useStudentStore.setState({
      students: [{ id: "seed", name: "Seed", strands: {} as any }],
      loading: false,
      error: "Boom",
      clearError,
      fetchStudents,
    } as any);

    const { getByText } = renderWithNav("student1");
    expect(getByText("Boom")).toBeTruthy();

    fireEvent.press(getByText("Try Again"));
    expect(clearError).toHaveBeenCalledTimes(1);
    expect(fetchStudents).toHaveBeenCalledTimes(1);
  });

  test("affiche 'Student Not Found' si aucun étudiant ne correspond", () => {
    const { getByText } = renderWithNav("missing");
    expect(getByText("Student Not Found")).toBeTruthy();
    expect(getByText("The requested student could not be found.")).toBeTruthy();
  });

  test("affiche le détail de l'étudiant et les sections", async () => {

    useStudentStore.setState({
      students: [
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
      ],
      loading: false,
      error: null,
    } as any);

    const { getByText } = renderWithNav("student1");

    await waitFor(() => expect(getByText("John Doe")).toBeTruthy());
    expect(getByText("Student Performance Report")).toBeTruthy();

    expect(getByText("Learning Strands Performance")).toBeTruthy();

    expect(getByText("Letter Identification")).toBeTruthy();

    // Summary
    expect(getByText("Performance Summary")).toBeTruthy();

    expect(getByText("Total Strands:")).toBeTruthy();
    expect(getByText("4")).toBeTruthy(); // total = 4 entrées
  });

  test("Download → ouvre l'alert puis Success quand on valide", async () => {
    const alertSpy = mockAlert();
    useStudentStore.setState({
      students: [
        {
          id: "student1",
          name: "John Doe",
          strands: { letterIdentification: { competence: "ME", progress: 75 } },
        },
      ],
    } as any);

    const { getByTestId } = renderWithNav("student1");

    fireEvent.press(getByTestId("download-btn"));
    expect(alertSpy).toHaveBeenCalledTimes(1);

    const [title, message, buttons] = alertSpy.mock.calls[0];
    expect(title).toBe("Download Report");
    expect(message).toContain("John Doe");
    expect(Array.isArray(buttons)).toBe(true);

    const downloadBtn = (buttons as any[]).find((b) => b.text === "Download");
    expect(downloadBtn).toBeTruthy();
    downloadBtn.onPress?.();

    expect(alertSpy).toHaveBeenCalledTimes(2);
    const [title2, message2] = alertSpy.mock.calls[1];
    expect(title2).toBe("Success");
    expect(message2).toBe("Report downloaded successfully!");
  });

  test("Pull-to-refresh appelle handleRefresh (clearError + fetchStudents)", async () => {
    const clearError = jest.fn();
    const fetchStudents = jest.fn();
    useStudentStore.setState({
      students: [
        { id: "student1", name: "John", strands: { letterIdentification: { competence: "ME", progress: 10 } } },
      ],
      loading: false,
      error: null,
      clearError,
      fetchStudents,
    } as any);

    const { getByTestId } = renderWithNav("student1");
    const scroll = getByTestId("student-scroll");

    const rc = scroll.props.refreshControl;
    expect(rc?.props?.refreshing).toBe(false);

    await waitFor(() => {
      rc.props.onRefresh();
    });

    expect(clearError).toHaveBeenCalledTimes(1);
    expect(fetchStudents).toHaveBeenCalledTimes(1);
  });
});
