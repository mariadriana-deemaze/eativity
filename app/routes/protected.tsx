import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { createStackNavigator } from "@react-navigation/stack";

import { Dashboard, Settings, Recipes } from "../screens";

import CustomDrawer from "../components/drawer";

import Ionicons from "@expo/vector-icons/Ionicons";

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
        name="Dashboard"
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
        name="Settings"
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
        name="Recipes"
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

const Routes = () => {
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
    <Stack.Screen name="Routes" component={Routes} />
  </Stack.Navigator>
);
