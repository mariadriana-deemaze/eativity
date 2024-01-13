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
  Center,
  Fade,
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

  const {
    control,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      ...userStateSlice.user,
    },
  });

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const toast = useToast();

  const updateUser = () => {
    const data = getValues();
    dispatch(updateUserInfo(data));
  };

  const nextStep = () => {
    const nextUp = onboardingStep + 1;
    setOnboardingStep(nextUp);
  };

  useEffect(() => {
    dispatch(getUserInfo()).then((response) => {
      reset(response.payload);
    });
  }, []);

  useEffect(() => {
    let navigateUserBack;

    if (userStateSlice.error) {
      // Display network error toaster
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
    <Box
      borderWidth="3"
      borderColor="orange.700"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="full"
    >
      {onboardingStep === 1 && (
        <Box
          w="80"
          // @ts-ignore
          gap="8"
        >
          <Box>
            <Text>{`Welcome to eativity ${userStateSlice.user.name}!`}</Text>
            <Text>{"Looks like we might be missing some information."}</Text>
            <Text>{"Please review you data on the next steps."}</Text>
          </Box>
          <Button colorScheme="green" onPress={nextStep}>
            Next
          </Button>
        </Box>
      )}

      {onboardingStep === 2 && (
        <Box
          w="80"
          // @ts-ignore
          gap="8"
        >
          <Box>
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
              onPressIn={() => setIsDatePickerOpen(true)}
              value={format(
                new Date(getValues("birthdate")) || new Date(),
                "MM/dd/yyyy"
              )}
            />
          </Box>
          <Button
            colorScheme="green"
            isDisabled={!getValues("birthdate")}
            onPress={nextStep}
          >
            Next
          </Button>
        </Box>
      )}
      {onboardingStep === 3 && (
        <Box
          w="80"
          // @ts-ignore
          gap="8"
        >
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                selectedValue={value}
                //onValueChange={onChange}
                accessibilityLabel="Pick a gender"
                placeholder="Pick a gender"
                _selectedItem={{
                  endIcon: <CheckIcon size="5" />,
                }}
              >
                <Select.Item
                  label="Male"
                  value={Gender.MALE}
                  onPress={() =>
                    setValue("gender", Gender.MALE, { shouldValidate: true })
                  }
                />
                <Select.Item
                  label="Female"
                  value={Gender.FEMALE}
                  onPress={() =>
                    setValue("gender", Gender.FEMALE, {
                      shouldValidate: true,
                    })
                  }
                />
                <Select.Item
                  label="Other"
                  value={Gender.OTHER}
                  onPress={() =>
                    setValue("gender", Gender.OTHER, { shouldValidate: true })
                  }
                />
              </Select>
            )}
            name="gender"
            rules={{ required: true }}
          />

          <Button
            colorScheme="green"
            onPress={nextStep}
            isDisabled={!getValues("gender")}
          >
            Next
          </Button>
        </Box>
      )}

      {onboardingStep === 4 && (
        <Box
          w="80"
          // @ts-ignore
          gap="8"
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Weight"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value && String(value)}
                placeholder="Insert your current weight"
              />
            )}
            name="weight"
            rules={{ required: true }}
          />

          <Button colorScheme="green" onPress={nextStep}>
            Next
          </Button>
        </Box>
      )}

      {onboardingStep === 5 && (
        <Box
          w="80"
          // @ts-ignore
          gap="8"
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Height"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value && String(value)}
                placeholder="Insert your current height"
              />
            )}
            name="height"
            rules={{ required: true }}
          />

          <Button colorScheme="green" onPress={nextStep}>
            Next
          </Button>
        </Box>
      )}

      {onboardingStep === 6 && (
        <Box
          w="80"
          // @ts-ignore
          gap="8"
        >
          <Text>All set, let's go!</Text>
          <Button colorScheme="green" onPress={updateUser}>
            Concluded
          </Button>
        </Box>
      )}
    </Box>
  );
};
