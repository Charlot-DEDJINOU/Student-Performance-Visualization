import React from "react";
import { render } from "@testing-library/react-native";
import MasteryKey from "../components/MasteryKey";

test("renders 4 cards horizontally", () => {
  const { getByText } = render(<MasteryKey />);
  expect(getByText("Mastery Key")).toBeTruthy();
  expect(getByText("Meeting Expectation")).toBeTruthy();
});
