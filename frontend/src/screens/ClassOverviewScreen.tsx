import React, { useEffect, useCallback } from "react";
import { View, Text, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import { useStudentStore } from "../stores/useStudentStore";
import SearchBar from "../components/SearchBar";
import MasteryKey from "../components/MasteryKey";
import StrandCard from "../components/StrandCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ClassOverview">;

const ClassOverviewScreen: React.FC<Props> = ({ navigation }) => {
  const {
    classProfile,
    loading,
    error,
    fetchClassProfile,
    fetchStudents,
    clearError,
  } = useStudentStore();

  const loadData = useCallback(async () => {
    await Promise.all([fetchClassProfile(), fetchStudents()]);
  }, [fetchClassProfile, fetchStudents]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStudentPress = (studentId: string) => {
    navigation.navigate("StudentDetail", { studentId });
  };

  const handleRefresh = () => {
    clearError();
    loadData();
  };

  if (loading && !classProfile) {
    return <LoadingSpinner message="Loading class performance data..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRefresh} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header fixe */}
      <View className="bg-white px-4 py-4">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Class Performance</Text>
        <Text className="text-gray-600 text-base">
          Monitor student progress across learning strands
        </Text>
      </View>

      {/* Search Bar fixe */}
      <View className="bg-white px-4 border-b border-gray-200">
        <SearchBar />
      </View>

      {/* Zone de défilement pour les Learning Strands */}
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
        >
          <Text className="text-xl font-bold text-gray-800 mb-4">Learning Strands</Text>
          
          {classProfile?.strands?.map((strand) => (
            <StrandCard 
              key={strand.strandId} 
              strand={strand} 
              onStudentPress={handleStudentPress} 
            />
          ))}
          
          {(!classProfile?.strands || classProfile.strands.length === 0) && (
            <View className="bg-white rounded-xl p-6 items-center">
              <Text className="text-gray-500 text-base">No strand data available</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View className="bg-white border-t border-gray-200">
        <MasteryKey />
      </View>
    </SafeAreaView>
  );
};

export default ClassOverviewScreen;