import {
  Box,
  Button,
  Text,
  useToast,
} from "native-base";
import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";

import { useSelector } from "react-redux";

import { TextField } from "../../components/atoms/textField";

import { ToastAlert } from "../../components/toastAlert";

import { Screens } from "../../routes/navigation";

import { IRootState, useAppDispatch } from "../../stores";

import { authenticateUser, SignInInputs } from "../../stores/auth/actions";

import { signInDefaultDevData } from "../../utils";

export const SignIn = ({ navigation }) => {
  const authStateSlice = useSelector((state: IRootState) => state.auth);

  const { control, handleSubmit } = useForm<SignInInputs>({
    defaultValues: signInDefaultDevData,
  });

  const dispatch = useAppDispatch();

  const toast = useToast();

  const onSubmit = (data: SignInInputs) => dispatch(authenticateUser(data));

  useEffect(() => {
    if (authStateSlice.error) {
      toast.show({
        id: "signInError",
        render: () => {
          return (
            <ToastAlert
              id="signInError"
              title={authStateSlice.error.title || "Erro"}
              description={authStateSlice.error.message || "Erro"}
              status="error"
              onClose={() => toast.close("signInError")}
            />
          );
        },
      });
    }
  }, [authStateSlice.error]);

  return (
    <Box
      flex="1"
      alignItems="center"
      justifyContent="center"
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg",
      }}
      bg="coolGray.100"
    >
      <Box
        w="80"
        // @ts-ignore
        gap="8"
      >
        <Text isTruncated maxW="300" w="80%">
          Sign in
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label="E-mail"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label="Password"
              type="password"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        <Button
          size="sm"
          colorScheme="green"
          onPress={handleSubmit(onSubmit)}
          isLoading={authStateSlice.loading}
        >
          Sign In
        </Button>

        <Text onPress={() => navigation.navigate(Screens.SIGN_UP)}>
          Don't have an account? Sign up now.
        </Text>
      </Box>
    </Box>
  );
};
