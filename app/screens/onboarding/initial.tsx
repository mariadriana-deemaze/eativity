import { StatusBar } from "expo-status-bar";

import { Text, View } from "react-native";

export default function Initial() {
  return (
    <View tw="flex-1 items-center justify-center bg-slate-900">
      <StatusBar style="light" />
      <Text tw="text-white">Initial</Text>
    </View>
  );
}
