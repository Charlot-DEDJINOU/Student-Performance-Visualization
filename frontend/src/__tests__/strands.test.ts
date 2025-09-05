import { getStrandDisplayName } from "../utils/strands";
test("maps key to display", () => {
  expect(getStrandDisplayName("letterIdentification")).toBe("Letter Identification");
});
