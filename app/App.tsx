import { Provider } from "react-redux";

import { /* extendTheme, */ NativeBaseProvider } from "native-base";

import Navigation from "./routes/navigation";

import store from "./stores";

// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

export default function App() {
  /*  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const theme = extendTheme({
    fontConfig: {
      Inter: {
        100: {
          normal: "Inter_100Thin",
          italic: "Inter_100Thin",
        },
      },
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
      mono: "Inter",
    },
    // colors, spacings...
  });
 */
  return (
    <Provider store={store}>
      <NativeBaseProvider
        // theme={theme}
        config={{
          strictMode: "warn",
        }}
      >
        <Navigation />
      </NativeBaseProvider>
    </Provider>
  );
}
