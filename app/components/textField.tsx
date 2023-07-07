import {
  FormControl,
  IInputProps,
  Input,
  Stack,
  WarningOutlineIcon,
} from "native-base";

interface TextFieldProps extends IInputProps {
  label: string;
  helperText?: string;
  error?: string;
}

export const TextField = ({
  label,
  isRequired,
  helperText,
  error,
  ...rest
}: TextFieldProps) => {
  return (
    <FormControl isRequired={isRequired}>
      <Stack mx="4">
        <FormControl.Label>{label}</FormControl.Label>
        <Input {...rest} />
        {helperText && (
          <FormControl.HelperText>{helperText}</FormControl.HelperText>
        )}
        {error && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {error}
          </FormControl.ErrorMessage>
        )}
      </Stack>
    </FormControl>
  );
};
