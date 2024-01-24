import { useEffect } from "react";

import { Box, Text } from "native-base";

import { SvgUri } from "react-native-svg";

import { IRootState, useAppDispatch } from "../../stores";

import { getUserInfo } from "../../stores/user/actions";

import { useSelector } from "react-redux";

export const Dashboard = () => {
  const authStateSlice = useSelector((state: IRootState) => state.auth);

  const userSliceState = useSelector((state: IRootState) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [authStateSlice.userToken]);

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
      bg="gray.100"
      width="100%"
    >
      <Text isTruncated maxW="300" w="80%" fontSize="lg">
        {userSliceState.user?.name || "-"}
      </Text>

      <SvgUri
        width="45"
        height="45"
        uri="https://www.svgrepo.com/show/532031/cloud-fog.svg"
      />
    </Box>
  );
};
