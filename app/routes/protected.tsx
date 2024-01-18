import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { createStackNavigator } from "@react-navigation/stack";

import { Dashboard, Settings, Recipes, Recipe } from "../screens";

import CustomDrawer from "../components/drawer";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Screens } from "./navigation";
import { Foods } from "../screens/protected/foods";
import { Food } from "../screens/protected/food";

const Drawer = createDrawerNavigator();

const BottomStack = createBottomTabNavigator();

const Stack = createStackNavigator();

export type RoutesParamList = {
  Recipes: undefined;
  Recipe: { recipeId: string };
  Foods: undefined;
  Food: { foodId: string };
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
    <Drawer.Navigator drawerContent={() => <CustomDrawer />}>
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
    <Stack.Screen name="Recipe" component={Recipe} />
    <Stack.Screen name="Food" component={Food} />
  </Stack.Navigator>
);
