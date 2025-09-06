import React from "react";
import { render } from "@testing-library/react-native";
import ProgressBar from "../components/ProgressBar";

describe("ProgressBar", () => {
  it("affiche le pourcentage quand showPercentage=true", () => {
    const { getByText } = render(<ProgressBar progress={42} showPercentage />);
    expect(getByText("42% completed")).toBeTruthy();
  });

  it("clamp: progress < 0 => 0%", () => {
    const { getByText } = render(<ProgressBar progress={-10} showPercentage />);
    expect(getByText("0% completed")).toBeTruthy();
  });

  it("clamp: progress > 100 => 100%", () => {
    const { getByText } = render(<ProgressBar progress={150} showPercentage />);
    expect(getByText("100% completed")).toBeTruthy();
  });

  it("n'affiche pas le texte quand showPercentage=false", () => {
    const { queryByText } = render(<ProgressBar progress={50} showPercentage={false} />);
    expect(queryByText(/completed$/)).toBeNull();
  });

  it("applique la hauteur sur la barre de fond", () => {
    const { toJSON } = render(<ProgressBar progress={30} height={12} />);
    const tree = toJSON() as any;

    const bg = tree.children[0]; // le conteneur background
    const style = bg.props.style;

    const height = Array.isArray(style)
      ? style.find((s) => s && typeof s === "object" && "height" in s)?.height
      : style?.height;

    expect(height).toBe(12);
  });

  it("applique les classes de couleur (bg & inner) via className", () => {
    const { toJSON } = render(
      <ProgressBar
        progress={60}
        color="bg-primary-500"
        backgroundColor="bg-gray-200"
      />
    );
    const tree = toJSON() as any;

    const bg = tree.children[0];
    const inner = bg.children[0];

    expect(bg.props.className).toEqual(expect.stringContaining("bg-gray-200"));
    expect(inner.props.className).toEqual(expect.stringContaining("bg-primary-500"));
  });
});
