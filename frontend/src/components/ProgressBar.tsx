import React from "react";
import { View, Text } from "react-native";

interface ProgressBarProps {
  progress: number;
  height?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
}

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showPercentage = true,
  color = "bg-primary-500",
  backgroundColor = "bg-gray-200",
}) => {
  const clamped = clamp(progress);

  return (
    <View className="w-full">
      <View className={`w-full ${backgroundColor} rounded-full overflow-hidden`} style={{ height }}>
        <View className={`${color} rounded-full h-full transition-all duration-300`} style={{ width: `${clamped}%` }} />
      </View>
      {showPercentage && <Text className="text-xs text-gray-600 mt-1">{clamped}% completed</Text>}
    </View>
  );
};

export default React.memo(ProgressBar);