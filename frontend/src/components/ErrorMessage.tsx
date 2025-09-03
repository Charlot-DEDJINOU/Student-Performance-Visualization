import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 px-6">
      <View className="bg-white rounded-xl p-6 shadow-sm border border-red-200 w-full max-w-sm">
        <View className="items-center">
          <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
            <Text className="text-red-500 text-2xl">⚠️</Text>
          </View>

          <Text className="text-lg font-bold text-gray-800 mb-2 text-center">
            Oops! Something went wrong
          </Text>

          <Text className="text-gray-600 text-center mb-6">
            {message || "An unexpected error occurred"}
          </Text>

          {onRetry && (
            <TouchableOpacity onPress={onRetry} className="bg-primary-500 px-6 py-3 rounded-lg active:bg-primary-600">
              <Text className="text-white font-semibold text-base">Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(ErrorMessage);