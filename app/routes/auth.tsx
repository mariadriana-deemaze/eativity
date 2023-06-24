import { createStackNavigator } from "@react-navigation/stack";

import { SignIn, SignUp } from "../screens";

export const AuthRoutes = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Sign In" component={SignIn} />
    </Stack.Navigator>
  );
};
