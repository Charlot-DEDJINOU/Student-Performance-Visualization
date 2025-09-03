import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useStudentStore } from "../stores/useStudentStore";
import ProgressBar from "./ProgressBar";
import CompetenceBadge from "./CompetenceBadge";
import type { StrandOverview } from "../types/education";

interface StrandCardProps {
  strand: StrandOverview;
  onStudentPress: (studentId: string) => void;
}

const StrandCard: React.FC<StrandCardProps> = ({ strand, onStudentPress }) => {
  const getFilteredStudents = useStudentStore((s) => s.getFilteredStudents);
  const filteredStudents = getFilteredStudents(strand.students);

  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 p-4">
      {/* Strand Header */}
      <View className="mb-4">
        <Text className="text-xl font-bold text-gray-800 mb-2">{strand.strand}</Text>
        <Text className="text-sm text-gray-600 mb-3">Work covered: {strand.workCovered}%</Text>
        <ProgressBar progress={strand.workCovered} height={6} showPercentage={false} color="bg-primary-500" />
      </View>

      {/* Students List */}
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-3">Students ({filteredStudents.length})</Text>

        {filteredStudents.length === 0 ? (
          <Text className="text-gray-500 text-sm italic py-2">No students found matching your search</Text>
        ) : (
          <View className="space-y-2">
            {filteredStudents.map((student) => (
              <TouchableOpacity
                key={`${strand.strandId}-${student.studentId}`}
                onPress={() => onStudentPress(student.studentId)}
                className="mb-2 flex-row items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 active:bg-gray-100"
              >
                <Text className="text-base text-gray-800 font-medium flex-1">{student.name}</Text>
                <CompetenceBadge competence={student.competence} size="sm" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default React.memo(StrandCard);