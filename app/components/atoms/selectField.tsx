import {
  FormControl,
  ISelectProps,
  Select,
  Stack,
  WarningOutlineIcon,
} from "@gluestack-ui/themed";

interface SelectFieldProps extends ISelectProps {
  label: string;
  helperText?: string;
  error?: string;
}

export const SelectField = ({
  label,
  // isRequired,
  helperText,
  error,
  ...rest
}: SelectFieldProps) => {
  return (
    <FormControl /* isRequired={isRequired} */>
      <Stack mx="4">
        <FormControl.Label>{label}</FormControl.Label>
        <Select {...rest} />
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
