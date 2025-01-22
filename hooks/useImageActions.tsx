import { IMAGE_DIMENSIONS } from "@/constants/Others";
import domtoimage from "dom-to-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { captureRef } from "react-native-view-shot";

export interface IDimensionsImage {
  width: number,
  height: number
}

export const useImageActions = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [mediaPermissionStatus, requestMediaPermission] =
    MediaLibrary.usePermissions();


  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const makePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not take any photo.");
    }
  };

  const makeScreenshot = async (imageRef: React.RefObject<View | Node>, size?: IDimensionsImage) => {
    const dimensions = size ?? {
      width: IMAGE_DIMENSIONS.width,
      height: IMAGE_DIMENSIONS.height
    };
    
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        if (!imageRef.current) return;

        const dataUrl = await domtoimage.toJpeg(imageRef.current as Node, {
          quality: 0.95,
          width: dimensions.width,
          height: dimensions.height,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash-pic.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (mediaPermissionStatus === null) {
      requestMediaPermission();
    }
  }, [mediaPermissionStatus]);

  return {
    selectedImage,
    setSelectedImage,
    pickImageAsync,
    makePhoto,
    makeScreenshot,
  };
};
