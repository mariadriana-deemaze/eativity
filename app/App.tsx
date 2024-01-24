import { useCallback, useEffect, useState } from "react";

import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";

import { NativeBaseProvider, extendTheme } from "native-base";

import * as SplashScreen from "expo-splash-screen";

import Navigation from "./routes/navigation";

import store from "./stores";

import {
  useFonts as useInterFonts,
  Inter_900Black,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import {
  useFonts as useJakartaFonts,
  PlusJakartaSans_200ExtraLight,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { colors } from "./theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [interFontsLoaded, interFontError] = useInterFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_900Black,
  });

  const [jakartafontsLoaded, jakartaFontError] = useJakartaFonts({
    PlusJakartaSans_200ExtraLight,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  const fontsNotLoaded =
    !interFontsLoaded &&
    !interFontError &&
    !jakartafontsLoaded &&
    !jakartaFontError;

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      !fontsNotLoaded && setAppIsReady(true);
    }

    prepare();
  }, [interFontsLoaded, jakartafontsLoaded]);

  const theme = extendTheme({
    /* fontConfig: {
      Inter: {
        300: { normal: Inter_300Light },
        400: { normal: Inter_400Regular },
        500: { normal: Inter_500Medium },
        600: { normal: Inter_600SemiBold },
        900: { normal: Inter_900Black },
      },
      Jakarta: {
        200: { normal: PlusJakartaSans_200ExtraLight },
        400: { normal: PlusJakartaSans_400Regular },
        600: { normal: PlusJakartaSans_600SemiBold },
        700: { normal: PlusJakartaSans_700Bold },
      },
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
      mono: "Inter",
    },
    fontSizes: {
      xs: 10,
      sm: 12,
      md: 16,
      lg: 20,
      xlg: 22,
    }, */
    colors: {
      green: {
        700: colors.green.primary,
        900: colors.green.secondary,
      },
    },
  });

  if (!appIsReady) return null;

  return (
    <Provider store={store}>
      <NativeBaseProvider
        theme={theme}
        config={{
          strictMode: "warn",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          onLayout={onLayoutRootView}
        >
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </View>
      </NativeBaseProvider>
    </Provider>
  );
}
