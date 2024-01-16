import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { IRootState } from "../stores";

import { AuthRoutes } from "./auth";

import { ProtectedRoutes } from "./protected";

export enum Screens {
  SIGN_IN = "SignIn",
  SIGN_UP = "SignUp",
  ONBOARDING = "Onboarding",
  DASHBOARD = "Dashboard",
  DAILY_LOG = "DailyLog",
  GOALS = "Goals",
  MY_RECIPES = "MyRecipes",
  MY_FOODS = "MyFoods",
  WEEKLY_SUMMARY = "WeeklySummary",
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
