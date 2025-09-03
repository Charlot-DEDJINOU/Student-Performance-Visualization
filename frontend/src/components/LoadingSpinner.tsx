import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text className="text-gray-600 mt-4 text-base">{message}</Text>
    </View>
  );
};

export default React.memo(LoadingSpinner);