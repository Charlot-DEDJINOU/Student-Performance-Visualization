import { Competence, CompetenceClasses } from "../types/education";

const colorMap: Record<Competence, string> = {
  BE: "text-competence-BE bg-red-50",
  AE: "text-competence-AE bg-yellow-50",
  ME: "text-competence-ME bg-green-50",
  EE: "text-competence-EE bg-blue-50",
};

export const getCompetenceClasses = (code: Competence | string): CompetenceClasses => ({
  cardBg:     `bg-competence-${code}-50`,
  cardBorder: `border-competence-${code}-200`,
  title:      `text-competence-${code}-800`,
  body:       `text-competence-${code}-700`,
  badgeBg:    `bg-competence-${code}-100`,
  badgeBorder:`border-competence-${code}-200`,
  badgeText:  `text-competence-${code}-700`,
});
