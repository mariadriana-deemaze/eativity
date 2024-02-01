import { useState } from "react";

import { useSelector } from "react-redux";

import { View } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Button, HStack, Image, VStack } from "native-base";

import { useFirebaseStorage } from "../../../hooks";

import { IRootState } from "../../../stores";

import { ToastAlert } from "../../toastAlert";

export const ImageUploader = ({
  folder,
  onChange,
}: {
  folder: string;
  onChange: (url: string | null) => void;
}) => {
  const userSliceState = useSelector((state: IRootState) => state.user);

  const [imageURI, setImageURI] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { uploadFile, isUploading } = useFirebaseStorage(
    `user_${userSliceState.user.id}/${folder}`
  );

  const pick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (result.canceled) {
      setError("User canceled!");
    }

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
      setError(null);
    }
  };

  const accept = async () => {
    const url = await uploadFile(imageURI);
    onChange(url);
  };

  const discard = () => {
    setImageURI(null);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={pick}>Pick an image from camera roll</Button>
      {error && (
        <ToastAlert
          title="Error!"
          description={error}
          status="error"
          onClose={() => setError(null)}
        />
      )}
      {imageURI && (
        <VStack>
          <Image
            alt="Recipe upload image"
            source={{ uri: imageURI }}
            style={{ width: 200, height: 200 }}
          />
          <HStack>
            <Button
              onPress={accept}
              isDisabled={isUploading}
              colorScheme="green"
            >
              Confirm
            </Button>
            <Button
              onPress={discard}
              isDisabled={isUploading}
              colorScheme="red"
            >
              Cancel
            </Button>
          </HStack>
        </VStack>
      )}
    </View>
  );
};
