import ActionButtons from "@/components/home/ActionButtons";
import EmojiList from "@/components/home/EmojiList";
import ImagePreview from "@/components/home/ImagePreview";
import OptionsButtons from "@/components/home/OptionsButtons";
import BottomSlideUp from "@/components/modals/BottomSlideup";

import { useImageActions } from "@/hooks/useImageActions";
import { type ImageSource } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import { StyleSheet, type View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";


export default function Index() {
  const { selectedImage, setSelectedImage, pickImageAsync, makePhoto } =
    useImageActions();

  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );
  const [mediaPermissionStatus, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const imageRef = useRef<View>(null);

  if (mediaPermissionStatus === null) {
    requestMediaPermission();
  }

  const handleUsePhoto = () => {
    setSelectedImage(undefined);
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImage = async () => {
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
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImagePreview
        imageRef={imageRef}
        selectedImage={selectedImage}
        pickedEmoji={pickedEmoji}
        style={styles.imagePreviewContainer}
      />

      {!showAppOptions ? (
        <ActionButtons
          onPickImage={() => {
            pickImageAsync();
            setShowAppOptions(true);
          }}
          onMakePhoto={() => {
            makePhoto();
            setShowAppOptions(true);
          }}
          onUsePhoto={() => {
            handleUsePhoto();
            setShowAppOptions(true);
          }}
          style={styles.actionButtonsContainer}
        />
      ) : (
        <OptionsButtons
          onSaveImage={onSaveImage}
          onAddSticker={onAddSticker}
          onReset={onReset}
          style={styles.optionsButtonsContainer}
        />
      )}
      <BottomSlideUp
        isVisible={isModalVisible}
        height={"25%"}
        onClose={onModalClose}
      >
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </BottomSlideUp>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  imagePreviewContainer: {
    flex: 3 / 5,
  },
  actionButtonsContainer: {
    flex: 2 / 5,
  },
  optionsButtonsContainer: {
    flex: 1 / 5,
  },
});
