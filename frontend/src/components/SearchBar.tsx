import React, { memo } from "react";
import { View, TextInput } from "react-native";
import { useStudentStore } from "../stores/useStudentStore";

const SearchBar: React.FC = () => {
  const searchQuery = useStudentStore((s) => s.searchQuery);
  const setSearchQuery = useStudentStore((s) => s.setSearchQuery);

  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4">
      <TextInput
        className="px-4 py-3 text-base text-gray-800"
        placeholder="Search students..."
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default memo(SearchBar);