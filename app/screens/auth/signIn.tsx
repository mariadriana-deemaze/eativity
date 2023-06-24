import { StatusBar } from "expo-status-bar";

import { Controller, useForm } from "react-hook-form";

import { Text, View, TextInput, Button } from "react-native";

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
    <View tw="flex-1 items-center justify-center bg-slate-900">
      <StatusBar style="light" />
      <Text tw="text-red-500">Sign In</Text>
      <Text>E-mail</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            tw="bg-white border w-100"
          />
        )}
        name="email"
        rules={{ required: true }}
      />

      <Text>Password</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            tw="bg-white border w-100"
          />
        )}
        name="password"
        rules={{ required: true }}
      />

      <Button onPress={handleSubmit(onSubmit)} title="Sign In" />

      <Text tw="color-white" onPress={() => navigation.navigate("Sign Up")}>
        Don't have an account? Sign up now.
      </Text>
    </View>
  );
};
