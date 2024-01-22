import React from "react";

import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@gluestack-ui/themed";

export interface ToastInfoProps {
  title?: string;
  message?: string;
}

interface ToastAlertProps {
  id?: string;
  onClose: () => void;
  title?: string;
  description?: string;
  status?: "info" | "warning" | "success" | "error";
  variant?: string;
  isClosable?: boolean;
}

export const defaultNetworkErrorMessage: ToastInfoProps = {
  title: "Network error",
  message: "There's a problem with the connection.",
};

export const ToastAlert = ({
  status,
  variant,
  title,
  description,
  isClosable = true,
  onClose,
}: ToastAlertProps) => {
  const textColor =
    variant === "solid"
      ? "lightText"
      : variant !== "outline"
      ? "darkText"
      : null;

  const iconStyles = {
    color: variant === "solid" ? "lightText" : "darkText",
  };

  return (
    <Alert w="80" status={status || "info"} variant="left-accent">
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              size="md"
              fontWeight="medium"
              flexShrink={1}
              color={textColor}
            >
              {title}
            </Text>
          </HStack>
          {isClosable ? (
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size="3" />}
              _icon={iconStyles}
              onPress={onClose}
            />
          ) : null}
        </HStack>
        <Text px="6" color={textColor}>
          {description}
        </Text>
      </VStack>
    </Alert>
  );
};
