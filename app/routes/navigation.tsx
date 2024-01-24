import { useEffect } from "react";

import { View } from "native-base";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import { decode as atob } from "base-64";

import * as SecureStore from "expo-secure-store";

import { IRootState } from "../stores";

import { TOKEN_KEY, clearAuthToken, setAuthToken } from "../stores/auth/slices";

import { AuthRoutes } from "./auth";

import { ProtectedRoutes } from "./protected";

export enum Screens {
  SIGN_IN = "SignIn",
  SIGN_UP = "SignUp",
  ONBOARDING = "Onboarding",
  DASHBOARD = "Dashboard",
  SETTINGS = "Settings",
  RECIPES = "Recipes",
  MY_RECIPES = "MyRecipes",
  MY_FOODS = "MyFoods",
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

  const navigation = useNavigation();

  useEffect(() => {
    const restoreJWTfromStore = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);

        const decoded = JSON.parse(atob(storedToken.split(".")[1]));

        const isExpired = decoded.exp * 1000 < new Date().getTime();

        if (isExpired) {
          // Expired - User must login again
          dispatch(clearAuthToken());
        } else {
          // Not Expired
          if (storedToken && userToken !== storedToken) {
            dispatch(setAuthToken(storedToken));
          }
        }
      } catch (error) {
        console.error("Error retrieving token from SecureStore ->", error);
      }
    };

    restoreJWTfromStore();

    const focusListener = navigation.addListener("focus", restoreJWTfromStore);

    return () => {
      focusListener();
    };
  }, [dispatch]);

  return (
    <View width="100%" height="100%">
      {!isAuth || enterOnboardingFlow ? (
        <AuthRoutes onboarding={enterOnboardingFlow} />
      ) : (
        <ProtectedRoutes />
      )}
    </View>
  );
}
