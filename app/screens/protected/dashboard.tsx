import { useEffect } from "react";

import { Box, Fab, Text } from "native-base";

import { Ionicons } from "@expo/vector-icons";

import { IRootState, useAppDispatch } from "../../stores";

import { getUserInfo } from "../../stores/user/actions";

import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../routes/navigation";

export const Dashboard = () => {
  const userSliceState = useSelector((state: IRootState) => state.user);

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const goToDailyLog = () => {
    // navigate to daily log
    // @ts-ignore
    navigation.navigate(Screens.DAILY_LOG);
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <Box
      flex="1"
      alignItems="center"
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg",
      }}
      bg="red.400"
    >
      <Text isTruncated maxW="300" w="80%" fontSize="lg">
        {userSliceState.user.name}
      </Text>
      <Fab
        onPress={goToDailyLog}
        placement="bottom-right"
        mb="14"
        colorScheme="green"
        size="lg"
        icon={<Ionicons name="add-outline" size={32} color="white" />}
      />
    </Box>
  );
};
