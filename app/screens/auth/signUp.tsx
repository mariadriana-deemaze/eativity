import { Controller, useForm } from "react-hook-form";

import { registerUser, SignUpInputs } from "../../stores/auth/actions";

import { useAppDispatch } from "../../stores";

import { TextField } from "../../components/textField";

import { Box, Button, Text } from "native-base";

export const SignUp = ({ navigation }) => {
  const { control, handleSubmit } = useForm<SignUpInputs>({
    defaultValues: {
      name: "Maria Adriana",
      email: "m@gmail.com",
      password: "123",
      password_repeat: "123",
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: SignUpInputs) => {
    dispatch(registerUser(data));
  };

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
        Sign up
      </Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Name"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="name"
        rules={{ required: true }}
      />

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
        Sign Up
      </Button>

      <Text onPress={() => navigation.navigate("Sign In")}>
        Already registered? Sign in
      </Text>
    </Box>
  );
};
