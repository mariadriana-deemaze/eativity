import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { IRootState } from "../stores";

import { AuthRoutes } from "./auth";

import { ProtectedRoutes } from "./protected";

export default function Navigation() {
  const { userToken } = useSelector((state: IRootState) => state.auth);

  const isAuth = !!userToken;

  return (
    <NavigationContainer>
      {!isAuth ? <AuthRoutes /> : <ProtectedRoutes />}
    </NavigationContainer>
  );
}
