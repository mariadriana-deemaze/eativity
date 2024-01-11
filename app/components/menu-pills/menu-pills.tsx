import { Box, Skeleton, Text } from "native-base";

export const MenuPillsSkeleton = () => {
  return (
    <Box
      borderBottomWidth="1"
      borderColor="muted.800"
      pl={["0", "4"]}
      pr={["0", "5"]}
      py="2"
    >
      <Skeleton flex="1" h="80" rounded="md" startColor="coolGray.100" />
    </Box>
  );
};

export const MenuPills = ({
  title,
  isActive,
}: {
  title;
  isActive: boolean;
}) => {
  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: isActive ? "muted.50" : "amber.300",
      }}
      borderColor="muted.800"
      pl={["0", "4"]}
      pr={["0", "5"]}
      py="2"
    >
      <Text
        fontSize="xs"
        _dark={{
          color: "warmGray.50",
        }}
        color="coolGray.800"
        alignSelf="flex-start"
      >
        {title}
      </Text>
    </Box>
  );
};
