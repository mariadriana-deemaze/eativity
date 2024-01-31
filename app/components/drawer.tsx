import { View, Text, Avatar, Skeleton, HStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthToken } from "../stores/auth/slices";
import { Screens } from "../routes/navigation";
import { useNavigation } from "@react-navigation/native";
import { IRootState } from "../stores";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme as theme, pallete } from "../theme";

export default function CustomDrawer() {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state: IRootState) => state.user);

  const navigation = useNavigation();

  const ITEMS = [
    {
      title: "Dashboard",
      link: Screens.DASHBOARD,
    },
    {
      title: "Daily Log",
      link: Screens.DAILYLOG,
    },
    {
      title: "Foods",
      link: Screens.FOODS,
    },
    {
      title: "My foods",
      link: Screens.MY_FOODS,
    },
    {
      title: "Recipes",
      link: Screens.RECIPES,
    },
    {
      title: "My recipes",
      link: Screens.MY_RECIPES,
    },
    // TODO: Weights screens
    {
      title: "Settings",
      link: Screens.SETTINGS,
    },
  ];

  const logout = () => {
    dispatch(clearAuthToken());
  };

  return (
    <View
      flex={1}
      px="5"
      bgColor="green.700"
      style={{
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
      }}
    >
      <View h="32" alignItems="flex-start" justifyContent="center">
        <HStack space="2" alignItems="center">
          {!user || loading ? (
            <>
              <Skeleton
                height="45"
                width="45"
                rounded="full"
                bgColor="green.700"
                startColor="green.900"
              />
              <Skeleton
                height="5"
                width="40"
                rounded="md"
                bgColor="green.700"
                startColor="green.900"
              />
            </>
          ) : (
            <>
              <Avatar
                borderWidth={3}
                borderColor="green.900"
                height="45"
                width="45"
                source={{
                  // TODO: Replace after image upload is implemented
                  uri: "https://wallpaperaccess.com/full/317501.jpg",
                }}
              />
              <Text color="white" fontFamily="PlusJakartaSans_600SemiBold">
                {user.name}
              </Text>
            </>
          )}
        </HStack>
      </View>
      <View flex={1}>
        {ITEMS.map(({ title, link }) => {
          return (
            <View key={`menu_item_${link}`} py="3">
              <Text
                fontFamily="PlusJakartaSans_600SemiBold"
                color={theme.text.paragraph.inverted}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate(link);
                }}
              >
                {title}
              </Text>
            </View>
          );
        })}
      </View>
      <HStack h="20" alignItems="center" space="2">
        <Ionicons
          name="log-in-outline"
          size={32}
          color={pallete.green.secondary}
        />
        <Text
          fontFamily="PlusJakartaSans_700Bold"
          color={pallete.green.secondary}
          onPress={logout}
        >
          Log out
        </Text>
      </HStack>
    </View>
  );
}
