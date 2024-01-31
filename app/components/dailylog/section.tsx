import { Dispatch, SetStateAction, useMemo } from "react";

import { useSelector } from "react-redux";

import {
  View,
  Text,
  Divider,
  HStack,
  Button,
  VStack,
  Actionsheet,
  Box,
  FlatList,
  Pressable,
  Image,
  Skeleton,
} from "native-base";

import { Swipeable } from "react-native-gesture-handler";

import { Controller, useForm } from "react-hook-form";

import {
  MealLog,
  MealType,
  PatchMealLogEntry,
  PostMealLogEntry,
} from "../../types";

import { TextField } from "../atoms/textField";

import { CounterField } from "../atoms/counterField";

import { lightTheme as theme } from "../../theme";

import { IRootState, useAppDispatch } from "../../stores";

import { createLogEntry, deleteLogEntry } from "../../stores/dailylog/actions";

import { DUMMY_AUTOCOMPLETE_FOOD, pluralize } from "../../utils";

const DailyLogMealTypeSectionSkeleton = () => {
  return (
    <VStack
      width="100%"
      py="3"
      px="2"
      backgroundColor={theme.background.secondary}
      space="4"
    >
      <Skeleton flex="1" height="5" rounded="md" bgColor="gray.100" />
      <HStack space="3">
        <Skeleton flex="1" height="5" rounded="md" bgColor="gray.100" />
        <HStack space="1" alignItems="center">
          <View bg="gray.200" height="2" width="2" borderRadius="full" />
          <Skeleton width="10" height="5" rounded="md" bgColor="gray.100" />
        </HStack>
        <HStack space="1" alignItems="center">
          <View bg="gray.200" height="2" width="2" borderRadius="full" />
          <Skeleton width="10" height="5" rounded="md" bgColor="gray.100" />
        </HStack>
        <HStack space="1" alignItems="center">
          <View bg="gray.200" height="2" width="2" borderRadius="full" />
          <Skeleton width="10" height="5" rounded="md" bgColor="gray.100" />
        </HStack>
      </HStack>
    </VStack>
  );
};

export const DailyLogMealTypeSection = ({
  title,
  data,
  inAddFlow,
  setInAddLogFlow,
}: {
  title: MealType;
  data: MealLog[];
  inAddFlow: boolean;
  setInAddLogFlow: Dispatch<SetStateAction<MealType>>;
}) => {
  const {
    setValue,
    getValues,
    reset,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<PostMealLogEntry | PatchMealLogEntry>();

  const { mutating, logsLoaded } = useSelector(
    (state: IRootState) => state.dailylog
  );

  const dispatch = useAppDispatch();

  const enterEditEntryFlow = () => {
    setInAddLogFlow(title);
    setValue("type", title);
  };

  const loadMore = () => {
    // TODO: loadMore from current search
  };

  const handleLogCreate = () => {
    const data = getValues();
    dispatch(createLogEntry(data)).then(() => {
      setInAddLogFlow(undefined);
    });
  };

  const handleLogDelete = (entryId: number) => {
    dispatch(deleteLogEntry(entryId));
  };

  const enterEditMode = (log: MealLog) => {
    enterEditEntryFlow();
    reset(log);
  };

  const sectionIntakesSum = useMemo(() => {
    let result = {
      fats: 0,
      calories: 0,
      carbohydrates: 0,
      proteins: 0,
      total: 0,
    };

    data.forEach(
      (log) =>
        (result = {
          fats: result.fats + log.food.fats * log.quantity,
          carbohydrates:
            result.carbohydrates + log.food.carbohydrates * log.quantity,
          proteins: result.proteins + log.food.proteins * log.quantity,
          calories: result.calories + log.food.calories * log.quantity,
          total: result.total + log.quantity,
        })
    );

    return result;
  }, [data]);

  watch();

  return (
    <>
      <View
        width="100%"
        borderWidth={1}
        borderRadius="lg"
        borderColor={theme.background.secondary}
        background={theme.background.primary}
      >
        <HStack justifyContent="space-between" px="2" py="3">
          <Text
            fontFamily="PlusJakartaSans_600SemiBold"
            color={theme.text.paragraph.primary}
            fontSize="lg"
          >
            {title}
          </Text>
          <Text
            fontFamily="PlusJakartaSans_400Regular"
            color={theme.text.paragraph.primary}
            fontSize="sm"
          >
            {sectionIntakesSum.total}{" "}
            {pluralize(sectionIntakesSum.total, "item")}
          </Text>
        </HStack>

        <Divider />

        <VStack width="100%" space="2" alignItems="center" px="2" py="3">
          {logsLoaded ? (
            data.length > 0 ? (
              data.map((log) => (
                <Swipeable
                  key={log.id}
                  renderRightActions={() => (
                    <HStack space="1" alignItems="center">
                      <Button
                        isDisabled={mutating}
                        onPress={() => handleLogDelete(log.id)}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </HStack>
                  )}
                >
                  <Pressable onPress={() => enterEditMode(log)}>
                    <VStack
                      width="100%"
                      py="3"
                      px="2"
                      borderRadius="5"
                      backgroundColor={theme.background.secondary}
                    >
                      <Text isTruncated>
                        {log.quantity}x {log.food.name}
                      </Text>
                      <HStack space="3">
                        <Text>{log.food.calories}</Text>

                        <HStack space="1" alignItems="center">
                          <View
                            bg={theme.red.primary}
                            height="2"
                            width="2"
                            borderRadius="full"
                          />
                          <Text
                            fontFamily="PlusJakartaSans_200ExtraLight"
                            color={theme.text.paragraph.secondary}
                            fontSize="xs"
                            isTruncated
                          >
                            {log.food.fats} {pluralize(log.food.fats, "fat")}
                          </Text>
                        </HStack>
                        <HStack space="1" alignItems="center">
                          <View
                            bg={theme.blue.primary}
                            height="2"
                            width="2"
                            borderRadius="full"
                          />
                          <Text
                            fontFamily="PlusJakartaSans_200ExtraLight"
                            color={theme.text.paragraph.secondary}
                            fontSize="xs"
                            isTruncated
                          >
                            {log.food.proteins}{" "}
                            {pluralize(log.food.proteins, "protein")}
                          </Text>
                        </HStack>
                        <HStack space="1" alignItems="center">
                          <View
                            bg={theme.purple.primary}
                            height="2"
                            width="2"
                            borderRadius="full"
                          />
                          <Text
                            fontFamily="PlusJakartaSans_200ExtraLight"
                            color={theme.text.paragraph.secondary}
                            fontSize="xs"
                            isTruncated
                          >
                            {log.food.carbohydrates}{" "}
                            {pluralize(log.food.carbohydrates, "carb")}
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </Pressable>
                </Swipeable>
              ))
            ) : (
              <Text
                fontFamily="PlusJakartaSans_600SemiBold"
                color={theme.text.paragraph.primary}
                fontSize="sm"
              >
                No entries added yet.
              </Text>
            )
          ) : (
            <DailyLogMealTypeSectionSkeleton />
          )}
        </VStack>

        <Divider />

        <HStack space="2" alignItems="center" px="2" py="3">
          <Button
            onPress={enterEditEntryFlow}
            colorScheme="green"
            isDisabled={!logsLoaded}
          >
            Add food
          </Button>

          {logsLoaded ? (
            <Text>You are totalling {sectionIntakesSum.calories} kcal.</Text>
          ) : (
            <Skeleton width="10" height="5" rounded="md" bgColor="gray.100" />
          )}
        </HStack>
      </View>
      <Actionsheet
        isOpen={inAddFlow}
        onClose={() => setInAddLogFlow(undefined)}
      >
        <Actionsheet.Content>
          <Box w="100%" px={4} justifyContent="center" borderWidth={2}>
            <Text>Add new {getValues("type")} entry.</Text>

            <VStack>
              <Text>Food_id: {getValues("foodId")}</Text>
              <Text>Quantity: {getValues("quantity")}</Text>
            </VStack>

            <TextField label="Search food" />

            <FlatList
              contentContainerStyle={{
                justifyContent: "space-between",
                alignContent: "space-between",
                alignItems: "center",
              }}
              height="56"
              numColumns={4}
              keyExtractor={(item) => String(item.id)}
              data={DUMMY_AUTOCOMPLETE_FOOD}
              renderItem={({ item }) => {
                const selected = getValues("foodId") === item.id;

                return (
                  <Pressable
                    width="25%"
                    height="24"
                    onPress={() => setValue("foodId", Number(item.id))}
                  >
                    <Box
                      width="100%"
                      height="100%"
                      p="2"
                      borderRadius="sm"
                      borderWidth={selected ? 2 : 1}
                      borderColor={selected ? "blue.900" : "gray.200"}
                      justifyItems="center"
                      alignItems="center"
                    >
                      <Box
                        width="100%"
                        height="100%"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Image
                          height="10"
                          width="10"
                          source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                          }}
                          alt="image"
                        />
                        <Text isTruncated>{item.name}</Text>
                      </Box>
                    </Box>
                  </Pressable>
                );
              }}
              onEndReached={loadMore}
              onEndReachedThreshold={0.3}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CounterField
                  label="Quantity"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value ? String(value) : undefined}
                  error={errors?.quantity?.message}
                />
              )}
              name="quantity"
              rules={{
                required: {
                  value: true,
                  message: "Required field.",
                },
                min: {
                  value: 1,
                  message: "Not a valid quantity.",
                },
              }}
            />
          </Box>

          <Button
            isLoading={mutating}
            isDisabled={!isValid}
            onPress={handleLogCreate}
          >
            Submit
          </Button>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
