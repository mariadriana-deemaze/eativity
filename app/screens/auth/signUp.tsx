import { Text, View, TextInput, Button } from "react-native";

import { StatusBar } from "expo-status-bar";

import { Controller, useForm } from "react-hook-form";

import { registerUser, SignUpInputs } from "../../stores/auth/actions";

import { useAppDispatch } from "../../stores";

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
    <View tw="flex-1 items-center justify-center bg-slate-900">
      <StatusBar style="light" />
      <Text tw="text-white">Sign up</Text>

      <Text>Name</Text>
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
        name="name"
        rules={{ required: true }}
      />

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
      <Button onPress={handleSubmit(onSubmit)} title="Sign Up" />

      <Text tw="color-white" onPress={() => navigation.navigate("Sign In")}>
        Already registered? Sign in
      </Text>
    </View>
  );
};
