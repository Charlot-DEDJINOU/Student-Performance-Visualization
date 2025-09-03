import React from "react";
import { View, Text } from "react-native";
import type { Competence } from "../types/education";

type BadgeSize = "sm" | "md" | "lg";

interface CompetenceBadgeProps {
  competence: Competence;
  size?: BadgeSize;
}

type Info = { label: string; bg: string; text: string; border: string };

const INFO: Record<Competence, Info> = {
  BE: { label: "BE", bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
  AE: { label: "AE", bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
  ME: { label: "ME", bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  EE: { label: "EE", bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

const CompetenceBadge: React.FC<CompetenceBadgeProps> = ({ competence, size = "md" }) => {
  const info = INFO[competence] ?? { label: "??", bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" };

  return (
    <View
      className={`${info.bg} ${info.border} border rounded-full ${SIZE_CLASSES[size]} items-center justify-center min-w-[50px]`}
    >
      <Text className={`${info.text} font-semibold text-center`}>{info.label}</Text>
    </View>
  );
};

export default React.memo(CompetenceBadge);
