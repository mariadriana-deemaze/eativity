import { useEffect } from "react";

import { Box, Text } from "native-base";

import { IRootState, useAppDispatch } from "../../stores";

import { getUserInfo } from "../../stores/user/actions";

import { useSelector } from "react-redux";

export const Dashboard = () => {
  const userSliceState = useSelector((state: IRootState) => state.user);

  const dispatch = useAppDispatch();

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
    </Box>
  );
};
