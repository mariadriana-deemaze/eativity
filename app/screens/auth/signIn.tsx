import { Box, Button, Text } from "native-base";

import { Controller, useForm } from "react-hook-form";

import { TextField } from "../../components/textField";

import { useAppDispatch } from "../../stores";

import { authenticateUser, SignInInputs } from "../../stores/auth/actions";

export const SignIn = ({ navigation }) => {
  const { control, handleSubmit } = useForm<SignInInputs>({
    defaultValues: {
      name: "adriana",
      email: "maria.adriana4@gmail.com",
      password: "123a",
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: SignInInputs) => dispatch(authenticateUser(data));

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
      bg="red.400"
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
        colorScheme="secondary"
        onPress={handleSubmit(onSubmit)}
      >
        Sign In
      </Button>

      <Text onPress={() => navigation.navigate("Sign Up")}>
        Don't have an account? Sign up now.
      </Text>
    </Box>
  );
};
