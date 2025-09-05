import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import ClassOverviewScreen from "../screens/ClassOverviewScreen";
import { studentService } from "../services/studentService";

// mock du service
jest.mock("../services/studentService");
const mockSvc = studentService as jest.Mocked<typeof studentService>;

describe("ClassOverviewScreen", () => {
  it("loads and shows strands", async () => {
    mockSvc.getClassProfile.mockResolvedValueOnce({
      strands: [
        { strandId: "st1", strand: "Letter Identification", workCovered: 70, students: [] },
      ],
    } as any);
    mockSvc.getStudents.mockResolvedValueOnce([]);

    const { getByText } = render(
      <NavigationContainer>
        <ClassOverviewScreen
          navigation={undefined as any}
          route={undefined as any}
        />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText("Letter Identification")).toBeTruthy();
    });
  });
});