import { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { SignIn, SignUp, Onboarding } from "../screens";

import { Screens } from "./navigation";

export type RoutesParamList = {
  SignUp: undefined;
  SignIn: undefined;
  Onboarding: undefined;
};

type NavigationRoutes = keyof RoutesParamList;

export const AuthRoutes = ({ onboarding }: { onboarding: boolean }) => {
  const Stack = createStackNavigator();

  const navigation = useNavigation<keyof RoutesParamList>();

  useEffect(() => {
    // @ts-ignore
    if (onboarding) navigation.navigate<NavigationRoutes>(Screens.ONBOARDING);
  }, [onboarding]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Screens.SIGN_UP} component={SignUp} />
      <Stack.Screen name={Screens.SIGN_IN} component={SignIn} />
      <Stack.Screen name={Screens.ONBOARDING} component={Onboarding} />
    </Stack.Navigator>
  );
};
