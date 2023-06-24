import { Provider } from "react-redux";

import Navigation from "./routes/navigation";

import store from "./stores";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
