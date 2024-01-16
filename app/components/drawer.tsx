import { Avatar, Box, Divider, Spinner, Text, VStack, View } from "native-base";

import { useNavigation, useRoute } from "@react-navigation/native";

import { GestureResponderEvent } from "react-native";

import { useSelector } from "react-redux";

import { IRootState } from "../stores";

import { Screens } from "../routes/navigation";

const MenuItem = ({
  title,
  onPress,
  isActive,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  isActive?: boolean;
}) => {
  return (
    <View
      px="5"
      py="3"
      bg={isActive ? "green.200" : "gray.100"}
      borderRadius="md"
    >
      <Text onPress={onPress}>{title}</Text>
    </View>
  );
};

export default function CustomDrawer() {
  const { user, loading } = useSelector((state: IRootState) => state.user);

  const navigation = useNavigation();

  const route = useRoute();

  // TODO: Add skeletons
  if (!user && loading) return <Spinner />;

  return (
    <Box safeArea h="full">
      <Box bg="gray.200" py="10" alignItems="center">
        {JSON.stringify(route)}
        <Avatar
          size="md"
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
        >
          {`${user.name[0]} ${user.name[1]}`}
        </Avatar>
        <Text fontSize="sm">{user.name}</Text>
        <Text fontSize="xs">{user.email}</Text>
      </Box>
      <Divider />
      <VStack space="2" display="flex" h="full" p="2">
        <MenuItem
          title="Dashboard"
          isActive={route.name === Screens.DASHBOARD}
          // @ts-ignore
          onPress={() => navigation.navigate(Screens.DASHBOARD)}
        />
        <MenuItem
          title="My recipes"
          isActive={route.name === Screens.MY_RECIPES}
          // @ts-ignore
          onPress={() => navigation.navigate(Screens.MY_RECIPES)}
        />
        <MenuItem
          title="My foods"
          isActive={route.name === Screens.MY_FOODS}
          // @ts-ignore
          onPress={() => navigation.navigate(Screens.MY_FOODS)}
        />
        <MenuItem
          title="Weekly summary"
          isActive={route.name === Screens.WEEKLY_SUMMARY}
          // @ts-ignore
          onPress={() => navigation.navigate(Screens.WEEKLY_SUMMARY)}
        />
        <MenuItem
          title="Settings"
          isActive={route.name === Screens.SETTINGS}
          // @ts-ignore
          onPress={() => navigation.navigate(Screens.SETTINGS)}
        />
      </VStack>
    </Box>
  );
}
