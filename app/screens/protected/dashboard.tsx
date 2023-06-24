import { StatusBar } from "expo-status-bar";

import { Text, View } from "react-native";

export const Dashboard = () => {
  return (
    <View tw="flex-1 items-center justify-center bg-slate-900">
      <StatusBar style="light" />
      <Text tw="text-white">Dashboard</Text>
    </View>
  );
};
