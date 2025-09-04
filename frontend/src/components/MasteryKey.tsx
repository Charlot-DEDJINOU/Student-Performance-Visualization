import React, { useCallback, memo } from "react";
import { View, Text, FlatList, ListRenderItem } from "react-native";
import type { Competence } from "../types/education";
import { getCompetenceClasses } from "../utils/competence";

type MasteryItem = {
  code: Competence;
  meaning: string;
  description: string;
};

const masteryLevels: MasteryItem[] = [
  { code: "BE", meaning: "Below Expectation", description: "Needs significant support" },
  { code: "AE", meaning: "Approaching Expectation", description: "Developing with support" },
  { code: "ME", meaning: "Meeting Expectation", description: "Consistently meets standards" },
  { code: "EE", meaning: "Exceeding Expectation", description: "Advanced mastery achieved" },
];

const Card = memo(({ item }: { item: MasteryItem }) => {
  const s = getCompetenceClasses(item.code);
  return (
    <View className={`w-60 ${s.cardBg} ${s.cardBorder} border rounded-xl p-3`}>
      <View className="flex-row items-center justify-between mb-1">
        <Text className={`font-semibold text-sm flex-1 ${s.title}`} numberOfLines={1}>
          {item.meaning}
        </Text>
        <View className={`ml-2 px-2 py-0.5 rounded-full border ${s.badgeBg} ${s.badgeBorder}`}>
          <Text className={`text-[10px] font-bold ${s.badgeText}`}>{item.code}</Text>
        </View>
      </View>
      <Text className={`text-xs ${s.body}`} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  );
});

const MasteryKey: React.FC = () => {
  const renderItem = useCallback<ListRenderItem<MasteryItem>>(
    ({ item }) => <Card item={item} />,
    []
  );

  return (
    <View className="p-4 mb-4">
      <Text className="text-lg font-bold text-gray-800 mb-3">Mastery Key</Text>

      <FlatList
        horizontal
        data={masteryLevels}
        keyExtractor={(i) => i.code}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View className="w-3" />}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(MasteryKey);