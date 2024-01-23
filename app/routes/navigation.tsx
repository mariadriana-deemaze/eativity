import { useEffect, useMemo } from "react";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import * as SecureStore from "expo-secure-store";

import { IRootState } from "../stores";

import { TOKEN_KEY, setAuthToken } from "../stores/auth/slices";

import { AuthRoutes } from "./auth";

import { ProtectedRoutes } from "./protected";

export enum Screens {
  SIGN_IN = "SignIn",
  SIGN_UP = "SignUp",
  ONBOARDING = "Onboarding",
  DASHBOARD = "Dashboard",
  SETTINGS = "Settings",
  RECIPES = "Recipes",
  RECIPE = "Recipe",
  FOODS = "Foods",
  FOOD = "Food",
}

export type RoutesParamList = {
  Recipes: undefined;
  Recipe: { recipeId: string };
  Foods: undefined;
  Food: { foodId: string };
};

export default function Navigation() {
  const authStateSlice = useSelector((state: IRootState) => state.auth);

  const userStateSlice = useSelector((state: IRootState) => state.user);

  const userToken = useSelector((state: IRootState) => state.auth.userToken);

  const isAuth = !!authStateSlice.userToken;

  const enterOnboardingFlow =
    isAuth &&
    userStateSlice?.user &&
    (!userStateSlice?.user?.height ||
      !userStateSlice?.user?.weight ||
      !userStateSlice?.user?.birthdate ||
      !userStateSlice?.user?.gender);

  const dispatch = useDispatch();

  //const navigation = useNavigation();

  useEffect(() => {
    const restoreJWTfromStore = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);

        if (storedToken && userToken !== storedToken) {
          dispatch(setAuthToken(storedToken));
        }
      } catch (error) {
        console.error("Error retrieving token from SecureStore ->", error);
      }
    };

    restoreJWTfromStore();

    //const focusListener = navigation.addListener("focus", restoreJWTfromStore);

    return () => {
      // focusListener();
    };
  }, [dispatch, userToken]);

  return (
    <NavigationContainer>
      {!isAuth || enterOnboardingFlow ? (
        <AuthRoutes onboarding={enterOnboardingFlow} />
      ) : (
        <ProtectedRoutes />
      )}
    </NavigationContainer>
  );
}
