import {
  FormControl,
  HStack,
  IInputProps,
  Input,
  Pressable,
  View,
  WarningOutlineIcon,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";

import { buttonStyles, buttonWrapperStyles } from "./style";

interface TextFieldProps extends IInputProps {
  label: string;
  helperText?: string;
  error?: string;
}

export const CounterField = ({
  label,
  isRequired,
  helperText,
  error,
  ...rest
}: TextFieldProps) => {
  const handleAddition = () => {
    console.log("addition ->");
    if (rest.value && rest.onChangeText) {
      const newValue = String(Number(rest.value) + 1);
      console.log("newValue ->", newValue);
      rest.onChangeText(newValue);
    }
  };

  const handleSubtract = () => {
    console.log("subtraction ->");
    if (rest.value && rest.onChangeText) {
      const newValue = String(Number(rest.value) - 1);
      console.log("newValue ->", newValue);
      rest.onChangeText(newValue);
    }
  };

  return (
    <FormControl isRequired={isRequired} style={{ width: "100%" }}>
      <FormControl.Label>{label}</FormControl.Label>
      <HStack space="3" w="100%" borderWidth={1}>
        <Pressable onPress={handleAddition} style={buttonStyles}>
          <View {...buttonWrapperStyles}>
            <Ionicons name="add-circle-outline" size={24} />
          </View>
        </Pressable>
        <Input
          {...rest}
          defaultValue="1"
          style={{
            flexGrow: 1,
            borderWidth: 1,
          }}
        />
        <Pressable onPress={handleSubtract} style={buttonStyles}>
          <View {...buttonWrapperStyles}>
            <Ionicons name="remove-circle-outline" size={24} />
          </View>
        </Pressable>
      </HStack>
      {helperText && (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      )}
      {error && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};
