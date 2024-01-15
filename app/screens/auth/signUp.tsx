import { Controller, useForm } from "react-hook-form";

import { useNavigation } from "@react-navigation/native";

import { Box, Button, Text } from "native-base";

import { registerUser, SignUpInputs } from "../../stores/auth/actions";

import { useAppDispatch } from "../../stores";

import { TextField } from "../../components/textField";

import { Screens } from "../../routes/navigation";

import { signUpDefaultDevData } from "../../utils";

export const SignUp: React.FC = () => {
  const { control, handleSubmit } = useForm<SignUpInputs>({
    defaultValues: signUpDefaultDevData,
  });

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const onSubmit = async (data: SignUpInputs) => {
    dispatch(registerUser(data)).then((response) => {
      if (response.payload) {
        // @ts-expect-error
        navigation.navigate(Screens.SIGN_IN);
      }
    });
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
      bg="coolGray.100"
    >
      <Box
        w="80"
        // @ts-ignore
        gap="8"
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

        <Button size="sm" colorScheme="green" onPress={handleSubmit(onSubmit)}>
          Sign Up
        </Button>

        <Text
          onPress={() => {
            // @ts-expect-error
            navigation.navigate(Screens.SIGN_IN);
          }}
        >
          Already registered? Sign in
        </Text>
      </Box>
    </Box>
  );
};
