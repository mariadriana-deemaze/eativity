import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { createStackNavigator } from "@react-navigation/stack";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import {
  Dashboard,
  Settings,
  Recipes,
  Recipe,
  Foods,
  MyFoods,
  MyRecipes,
} from "../screens";

import CustomDrawer from "../components/drawer";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Text } from "native-base";

import { DailyLog } from "../screens/protected/dailyLog";

import { Screens } from "./navigation";

const Drawer = createDrawerNavigator();

const BottomStack = createBottomTabNavigator();

const Stack = createStackNavigator();

export type RoutesParamList = {
  Recipes: undefined;
  Recipe: { recipeId: string };
};

const AppBottomStack = () => {
  return (
    <BottomStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomStack.Screen
        name={Screens.DASHBOARD}
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="podium-outline"
              size={32}
              color={focused ? "green" : "gray"}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name={Screens.FOODS}
        component={Foods}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="restaurant-outline"
              size={32}
              color={focused ? "green" : "gray"}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name={Screens.RECIPES}
        component={Recipes}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="book-outline"
              size={32}
              color={focused ? "green" : "gray"}
            />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator drawerContent={() => <CustomDrawer />}>
      <Drawer.Screen name="Eativity" component={AppBottomStack} />
      <Stack.Screen name={Screens.RECIPE} component={Recipe} />
      <Stack.Screen name={Screens.DAILY_LOG} component={DailyLog} />
      <Stack.Screen name={Screens.SETTINGS} component={Settings} />
      <Stack.Screen name={Screens.MY_FOODS} component={MyFoods} />
      <Stack.Screen name={Screens.MY_RECIPES} component={MyRecipes} />
      <Stack.Screen
        name={Screens.WEEKLY_SUMMARY}
        component={() => <Text>My weekly summary</Text>}
      />
    </Drawer.Navigator>
  );
};

export const ProtectedRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerBackTitleVisible: true,
    }}
    screenListeners={({ route }) => ({
      state: () => {
        const subRoute = getFocusedRouteNameFromRoute(route);
        console.log("subroute", subRoute);
        // Your logic here //
      },
    })}
  >
    <Stack.Screen name="Routes" component={DrawerRoutes} />
  </Stack.Navigator>
);
