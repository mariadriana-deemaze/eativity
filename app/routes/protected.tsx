import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { createStackNavigator } from "@react-navigation/stack";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
  Dashboard,
  Settings,
  Recipes,
  Recipe,
  Foods,
  Food,
  DailyLog,
} from "../screens";

import CustomDrawer from "../components/drawer";

import { Screens } from "./navigation";

const Drawer = createDrawerNavigator();

const BottomStack = createBottomTabNavigator();

const Stack = createStackNavigator();

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
              name="md-checkmark-circle"
              size={32}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name={Screens.SETTINGS}
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-checkmark-circle"
              size={32}
              color={focused ? "blue" : "gray"}
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
              name="md-checkmark-circle"
              size={32}
              color={focused ? "blue" : "gray"}
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
              name="md-checkmark-circle"
              size={32}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <CustomDrawer />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Drawer.Screen name="Eativity" component={AppBottomStack} />
    </Drawer.Navigator>
  );
};

export const ProtectedRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Routes" component={DrawerRoutes} />
    <Stack.Screen name={Screens.RECIPE} component={Recipe} />
    <Stack.Screen name={Screens.FOOD} component={Food} />
    <Stack.Screen name={Screens.DAILYLOG} component={DailyLog} />
    {/* MOVE THEM TO HERE */}
    {/* <Stack.Screen name={Screens.RECIPES} component={Recipes} />
    <Stack.Screen name={Screens.FOODS} component={Foods} /> */}
  </Stack.Navigator>
);
