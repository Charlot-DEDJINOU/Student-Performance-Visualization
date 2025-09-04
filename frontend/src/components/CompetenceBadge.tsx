import React from "react";
import { View, Text } from "react-native";
import type { Competence } from "../types/education";
import { getCompetenceClasses } from "../utils/competence";

type BadgeSize = "sm" | "md" | "lg";

interface CompetenceBadgeProps {
  competence: Competence;
  size?: BadgeSize;
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

const CompetenceBadge: React.FC<CompetenceBadgeProps> = ({ competence, size = "md" }) => {
  const s = getCompetenceClasses(competence);

  return (
    <View
      className={`${s.badgeBg} ${s.badgeBorder} border rounded-full ${SIZE_CLASSES[size]} items-center justify-center min-w-[50px]`}
    >
      <Text className={`${s.badgeText} font-semibold text-center`}>{competence}</Text>
    </View>
  );
};

export default React.memo(CompetenceBadge);
