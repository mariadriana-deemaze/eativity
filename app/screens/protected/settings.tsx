import { useState } from "react";

import { ScrollView } from "react-native";

import { useSelector } from "react-redux";

import { Box, Button, Text, Select, CheckIcon } from "native-base";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Controller, useForm } from "react-hook-form";

import { format } from "date-fns";

import { TextField } from "../../components/textField";

import { IRootState, useAppDispatch } from "../../stores";

import { updateUserInfo } from "../../stores/user/actions";

import { User, Gender, MeasurementUnit } from "../../types/user";

export const Settings = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const user = useSelector((state: IRootState) => state.user.user);
  const isLoading = useSelector((state: IRootState) => state.user.loading);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = useForm<User>({
    defaultValues: {
      ...user,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => dispatch(updateUserInfo(data));

  return (
    <ScrollView>
      {!isLoading ? (
        <Box
          flex="1"
          alignItems="center"
          _text={{
            fontSize: "md",
            fontWeight: "medium",
            color: "warmGray.50",
            letterSpacing: "lg",
          }}
          bg="white"
          paddingY="2"
        >
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

          {isDatePickerOpen && (
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={new Date(value) || new Date()}
                  mode="date"
                  display="default"
                  onChange={(_event, selectedDate) => {
                    onChange(selectedDate);
                    setIsDatePickerOpen(false);
                  }}
                  is24Hour
                />
              )}
              name="birthdate"
              rules={{ required: true }}
            />
          )}

          <TextField
            label="Birthdate"
            onFocus={() => setIsDatePickerOpen(true)}
            value={
              getValues("birthdate")
                ? format(new Date(getValues("birthdate")), "MM/dd/yyyy")
                : "Not defined"
            }
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Height"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={String(value)}
              />
            )}
            name="height"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                selectedValue={value}
                onValueChange={onChange}
                width={"96%"}
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
              >
                <Select.Item label="Male" value={Gender.MALE} />
                <Select.Item label="Female" value={Gender.FEMALE} />
                <Select.Item label="Other" value={Gender.OTHER} />
              </Select>
            )}
            name="gender"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                selectedValue={value}
                onValueChange={onChange}
                width={"96%"}
                accessibilityLabel="Measurement unit"
                placeholder="Measurement unit"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
              >
                <Select.Item label="Metric" value={MeasurementUnit.METRIC} />
                <Select.Item
                  label="Imperial"
                  value={MeasurementUnit.IMPERIAL}
                />
              </Select>
            )}
            name="measurementUnit"
            rules={{ required: true }}
          />

          {/* 
          TODO: Return user.weight
          */}
          {/* <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Weight"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="weight"
            rules={{ required: true }}
          /> */}

          {/* 
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Goal"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="goal"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Goal diff"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="goal_diff"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="average_minutes_per_training_session"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="average_minutes_per_training_session"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="weekly_training_amount"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="weekly_training_amount"
            rules={{ required: true }}
          /> */}

          <Button
            size="sm"
            colorScheme="secondary"
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isDirty}
          >
            SAVE
          </Button>
        </Box>
      ) : (
        <>
          <Text>loading...</Text>
        </>
      )}
    </ScrollView>
  );
};
