import { useCallback, useEffect, useState } from "react";

import { View } from "react-native";

import { Provider } from "react-redux";

import { NativeBaseProvider } from "native-base";

import * as SplashScreen from "expo-splash-screen";

import Navigation from "./routes/navigation";

import store from "./stores";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        // Load calls here
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) return null;

  return (
    <Provider store={store}>
      <NativeBaseProvider
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
            borderWidth: 1,
            borderColor: "red",
            width: "100%",
          }}
          onLayout={onLayoutRootView}
        >
          <Navigation />
        </View>
      </NativeBaseProvider>
    </Provider>
  );
}
