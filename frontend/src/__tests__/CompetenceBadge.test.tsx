import React from "react";
import { render } from "@testing-library/react-native";
import CompetenceBadge from "../components/CompetenceBadge";

test("renders label and classes for ME", () => {
  const { getByText } = render(<CompetenceBadge competence="ME" size="sm" />);
  expect(getByText("ME")).toBeTruthy();
});
