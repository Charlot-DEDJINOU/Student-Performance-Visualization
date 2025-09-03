import React, { useCallback, memo } from "react";
import { View, Text, FlatList, ListRenderItem } from "react-native";
import type { Competence } from "../types/education";

type MasteryItem = {
  code: Competence;
  meaning: string;
  description: string;
};

const masteryLevels: MasteryItem[] = [
  { code: "BE", meaning: "Below Expectation",      description: "Needs significant support" },
  { code: "AE", meaning: "Approaching Expectation", description: "Developing with support" },
  { code: "ME", meaning: "Meeting Expectation",     description: "Consistently meets standards" },
  { code: "EE", meaning: "Exceeding Expectation",   description: "Advanced mastery achieved" },
];

// Couleurs par code
const STYLE: Record<Competence, {
  cardBg: string; cardBorder: string; title: string; body: string;
  badgeBg: string; badgeBorder: string; badgeText: string;
}> = {
  BE: {
    cardBg: "bg-red-50", cardBorder: "border-red-200",
    title: "text-red-800", body: "text-red-700",
    badgeBg: "bg-red-100", badgeBorder: "border-red-200", badgeText: "text-red-700",
  },
  AE: {
    cardBg: "bg-yellow-50", cardBorder: "border-yellow-200",
    title: "text-yellow-800", body: "text-yellow-700",
    badgeBg: "bg-yellow-100", badgeBorder: "border-yellow-200", badgeText: "text-yellow-700",
  },
  ME: {
    cardBg: "bg-green-50", cardBorder: "border-green-200",
    title: "text-green-800", body: "text-green-700",
    badgeBg: "bg-green-100", badgeBorder: "border-green-200", badgeText: "text-green-700",
  },
  EE: {
    cardBg: "bg-blue-50", cardBorder: "border-blue-200",
    title: "text-blue-800", body: "text-blue-700",
    badgeBg: "bg-blue-100", badgeBorder: "border-blue-200", badgeText: "text-blue-700",
  },
};

const Card = memo(({ item }: { item: MasteryItem }) => {
  const s = STYLE[item.code];
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