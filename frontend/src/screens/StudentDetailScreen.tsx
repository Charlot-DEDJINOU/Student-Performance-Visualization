import React, { useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { useStudentStore } from "../stores/useStudentStore";
import CompetenceBadge from "../components/CompetenceBadge";
import ProgressBar from "../components/ProgressBar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import MasteryKey from "../components/MasteryKey";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import type { StrandKey, StudentStrandInfo } from "../types/education";

type Props = NativeStackScreenProps<RootStackParamList, "StudentDetail">;

const StudentDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { studentId } = route.params;

  const {
    students,
    loading,
    error,
    fetchStudents,
    getStudentById,
    getStrandDisplayName,
    clearError,
  } = useStudentStore();

  const student = getStudentById(studentId);

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, [students.length, fetchStudents]);

  const handleDownload = useCallback(() => {
    Alert.alert(
      "Download Report",
      `Download performance report for ${student?.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Download",
          onPress: () => {
            // Implémente ici la vraie logique de téléchargement/partage (Print/Share)
            Alert.alert("Success", "Report downloaded successfully!");
          },
        },
      ]
    );
  }, [student?.name]);

  const handleRefresh = useCallback(() => {
    clearError();
    fetchStudents();
  }, [clearError, fetchStudents]);

  if (loading && !student) {
    return <LoadingSpinner message="Loading student details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRefresh} />;
  }

  if (!student) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Student Not Found</Text>
          <Text className="text-gray-600 text-center mb-6">
            The requested student could not be found.
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-primary-500 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // On typage explicitement le résultat d'Object.entries pour éviter les 'string' non désirés
  const strandEntries = useMemo(
    () => Object.entries(student.strands) as [StrandKey, StudentStrandInfo][],
    [student.strands]
  );

  const summary = useMemo(() => {
    const total = strandEntries.length;
    const avg =
      total === 0
        ? 0
        : Math.round(
          strandEntries.reduce((sum, [, data]) => sum + data.progress, 0) / total
        );

    const countEE = strandEntries.filter(([, d]) => d.competence === "EE").length;
    const countME = strandEntries.filter(([, d]) => d.competence === "ME").length;
    const countBE = strandEntries.filter(([, d]) => d.competence === "BE").length;

    return { total, avg, countEE, countME, countBE };
  }, [strandEntries]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} />}
      >
        {/* Student Profile Header */}
        <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900 mb-2">{student.name}</Text>
              <Text className="text-gray-600 text-base">Student Performance Report</Text>
            </View>
            <TouchableOpacity
              onPress={handleDownload}
              className="bg-primary-500 px-4 py-2 rounded-lg active:bg-primary-600"
            >
              <Text className="text-white font-semibold text-sm">Download</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Detailed Strand Performance Sections */}
        <View className="mb-4">
          <Text className="text-xl font-bold text-gray-800 mb-4">Learning Strands Performance</Text>

          {strandEntries.length === 0 ? (
            <View className="bg-white rounded-xl p-6 items-center">
              <Text className="text-gray-500 text-base">No performance data available</Text>
            </View>
          ) : (
            strandEntries.map(([strandKey, strandData]) => (
              <View
                key={strandKey}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4"
              >
                {/* Strand Title */}
                <Text className="text-lg font-bold text-gray-800 mb-4">
                  {getStrandDisplayName(strandKey)}
                </Text>

                {/* Current Competence Level */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-base font-semibold text-gray-700">Current Competence Level:</Text>
                  <CompetenceBadge competence={strandData.competence} size="md" />
                </View>

                {/* Progress Metrics */}
                <View>
                  <Text className="text-base font-semibold text-gray-700 mb-3">
                    Work Progress: {strandData.progress}%
                  </Text>
                  <ProgressBar progress={strandData.progress} height={8} showPercentage={false} color="bg-primary-500" />
                </View>
              </View>
            ))
          )}
        </View>

        {/* Summary Stats */}
        <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Performance Summary</Text>

          {strandEntries.length > 0 && (
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Average Progress:</Text>
                <Text className="font-semibold text-gray-800">{summary.avg}%</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">Total Strands:</Text>
                <Text className="font-semibold text-gray-800">{summary.total}</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">Exceeding Expectations:</Text>
                <Text className="font-semibold text-blue-600">{summary.countEE}</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">Meeting Expectations:</Text>
                <Text className="font-semibold text-green-600">{summary.countME}</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">Needs Support:</Text>
                <Text className="font-semibold text-red-600">{summary.countBE}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View className="bg-white border-t border-gray-200">
        <MasteryKey />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(StudentDetailScreen);