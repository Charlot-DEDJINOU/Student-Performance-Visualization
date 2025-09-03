import { Competence } from "../types/education";

const colorMap: Record<Competence, string> = {
  BE: "text-competence-BE bg-red-50",
  AE: "text-competence-AE bg-yellow-50",
  ME: "text-competence-ME bg-green-50",
  EE: "text-competence-EE bg-blue-50",
};

export function getCompetenceColor(c: Competence | string): string {
  return (colorMap as any)[c] ?? "text-gray-500 bg-gray-50";
}
