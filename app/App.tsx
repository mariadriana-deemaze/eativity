import { Provider } from "react-redux";

import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./routes/navigation";

import store from "./stores";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider
        config={{
          strictMode: "warn",
        }}
      >
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
