import { Provider } from "react-redux";

import { GluestackUIProvider } from "@gluestack-ui/themed";

import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme

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
      <GluestackUIProvider config={config}>
        <Navigation />
      </GluestackUIProvider>
    </Provider>
  );
}
