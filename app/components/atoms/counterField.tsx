import { Ionicons } from "@expo/vector-icons";
import {
  FormControl,
  HStack,
  IInputProps,
  Input,
  Pressable,
  View,
  WarningOutlineIcon,
} from "native-base";

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
    if (rest.value && rest.onChange) {
      const newValue = Number(rest.value) + 1;
      // @ts-ignore
      rest.onChange(newValue);
    }
  };

  const handleSubtract = () => {
    console.log("subtraction ->");
  };

  return (
    <FormControl isRequired={isRequired}>
      <FormControl.Label>{label}</FormControl.Label>
      <HStack space="3">
        <Pressable onPress={handleAddition}>
          <View bg="gray.200" rounded="full">
            <Ionicons name="add-circle-outline" size={32} />
          </View>
        </Pressable>
        <Input {...rest} />
        <Pressable onPress={handleSubtract}>
          <View bg="gray.200" rounded="full">
            <Ionicons name="remove-circle-outline" size={32} />
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
