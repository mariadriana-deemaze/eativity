import { Button } from "native-base";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { clearAuthToken } from "../stores/auth/slices";

export default function CustomDrawer() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAuthToken());
  };

  return (
    <View>
      <Text>My drawer</Text>
      <Button onPress={logout}>Log out</Button>
    </View>
  );
}
