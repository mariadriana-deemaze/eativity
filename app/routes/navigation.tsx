import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { IRootState } from "../stores";

import { AuthRoutes } from "./auth";

import { ProtectedRoutes } from "./protected";

import { Text } from "native-base";

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

export default function Navigation() {
  const authStateSlice = useSelector((state: IRootState) => state.auth);

  const userStateSlice = useSelector((state: IRootState) => state.user);

  const isAuth = !!authStateSlice.userToken;

  const enterOnboardingFlow =
    isAuth &&
    (!userStateSlice?.user?.height ||
      !userStateSlice?.user?.weight ||
      !userStateSlice?.user?.birthdate ||
      !userStateSlice?.user?.gender);

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
