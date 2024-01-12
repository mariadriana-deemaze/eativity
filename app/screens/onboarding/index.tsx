import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  Box,
  Slide,
  Spinner,
  useToast,
  Button,
  Select,
  CheckIcon,
  Text,
} from "native-base";

import { useSelector } from "react-redux";

import { Controller, useForm } from "react-hook-form";

import { format } from "date-fns";

import { ToastAlert } from "../../components/toastAlert";

import { Screens } from "../../routes/navigation";

import { IRootState, useAppDispatch } from "../../stores";

import { getUserInfo, updateUserInfo } from "../../stores/user/actions";

import { TextField } from "../../components/textField";

import { Gender, User } from "../../types/user";

export const Onboarding = () => {
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  /**
   *
   * 1. Look's like we are missing some information.
   * Complete your profile in the following steps.
   *
   * 2. Missing birthdate
   * 3. Missing gender
   * 4. Missing weight
   * 5. Missing height
   *
   */

  const authStateSlice = useSelector((state: IRootState) => state.auth);

  const userStateSlice = useSelector((state: IRootState) => state.user);

  const { control, getValues } = useForm<User>({
    defaultValues: {
      ...userStateSlice.user,
    },
  });

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const toast = useToast();

  const navigateToDashboard = () => {
    // @ts-ignore
    navigation.navigate(Screens.DASHBOARD);
  };

  const updateUser = () => {
    const data = getValues();
    dispatch(updateUserInfo(data));
  };

  useEffect(() => {
    if (onboardingStep === 6) updateUser();

    return () => {
      setOnboardingStep(1);
    };
  }, [onboardingStep]);

  useEffect(() => {
    dispatch(getUserInfo()).then((response) => {
      // reset()
    });
  }, []);

  useEffect(() => {
    let navigateUserBack;

    if (userStateSlice.error) {
      // Display network erro toaster
      toast.show({
        id: "getUserError",
        render: () => {
          return (
            <ToastAlert
              id="getUserError"
              title={userStateSlice?.error?.title || "Erro"}
              description={userStateSlice?.error?.message || "Erro"}
              status="error"
              onClose={() => toast.close("signInError")}
            />
          );
        },
      });

      // Navigate the user back
      navigateUserBack = setTimeout(navigation.goBack, 500);
    }

    return () => {
      if (navigateUserBack) {
        clearTimeout(navigateUserBack);
      }
    };
  }, [userStateSlice.error]);

  if (!userStateSlice?.user)
    return (
      <Box flex="1" display="flex" justifyContent="center">
        <Spinner size="lg" />
      </Box>
    );

  return (
    <Box>
      <Slide in={onboardingStep === 1}>
        <Box>
          <Text>{`Welcome to eativity ${userStateSlice.user}!`}</Text>
          <Text>{"Looks like we might be missing some information."}</Text>
          <Text>{"Please review you data on the next steps."}</Text>
          <Button
            onPress={() => {
              // @ts-ignore
              navigation.navigate(Screens.ONBOARDING_BIRTHDATE);
            }}
          >
            Next
          </Button>
        </Box>
      </Slide>
      <Slide in={onboardingStep === 2}>
        <Box>
          <Text>Birthdate</Text>
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
        </Box>
      </Slide>
      <Slide in={onboardingStep === 3}>
        <Box>
          <Text>Gender</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
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
        </Box>
      </Slide>
      <Slide in={onboardingStep === 4}>
        <Box>
          <Text>Weight</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Weight"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={String(value)}
              />
            )}
            name="weight"
            rules={{ required: true }}
          />
        </Box>
      </Slide>
      <Slide in={onboardingStep === 5}>
        <Box>
          <Text>Height</Text>
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
        </Box>
      </Slide>
      <Slide in={onboardingStep === 6}>
        <Box>
          <Text>All set, let's go!</Text>
          <Button onPress={navigateToDashboard}>Concluído</Button>
        </Box>
      </Slide>
    </Box>
  );
};
