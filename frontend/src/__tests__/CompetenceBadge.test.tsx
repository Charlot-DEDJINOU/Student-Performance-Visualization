import React from "react";
import { render } from "@testing-library/react-native";
import CompetenceBadge from "../components/CompetenceBadge";

jest.mock("../utils/competence", () => ({
  getCompetenceClasses: (_code: string) => ({
    badgeBg: "bg-mock-badge",
    badgeBorder: "border-mock-badge",
    badgeText: "text-mock-badge",
  }),
}));

describe("CompetenceBadge", () => {
  it("rend le label de compétence et applique les classes dynamiques", () => {
    const { getByText, toJSON } = render(<CompetenceBadge competence="ME" size="sm" />);

    expect(getByText("ME")).toBeTruthy();

    const tree = toJSON() as any;

    expect(tree.props.className).toEqual(
      expect.stringContaining("bg-mock-badge")
    );
    expect(tree.props.className).toEqual(
      expect.stringContaining("border-mock-badge")
    );
    expect(tree.props.className).toEqual(
      expect.stringContaining("px-2 py-1 text-xs") // size sm
    );

    const textNode = tree.children[0];
    expect(textNode.props.className).toEqual(
      expect.stringContaining("text-mock-badge")
    );
  });

  it("applique les classes de taille 'lg'", () => {
    const { toJSON } = render(<CompetenceBadge competence="EE" size="lg" />);
    const tree = toJSON() as any;

    expect(tree.props.className).toEqual(expect.stringContaining("px-4"));
    expect(tree.props.className).toEqual(expect.stringContaining("py-2"));
    expect(tree.props.className).toEqual(expect.stringContaining("text-base"));
  });
});
