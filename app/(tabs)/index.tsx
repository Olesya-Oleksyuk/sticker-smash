import ActionButtons from "@/components/home/ActionButtons";
import EmojiList from "@/components/home/EmojiList";
import ImagePreview from "@/components/home/ImagePreview";
import OptionsButtons from "@/components/home/OptionsButtons";
import BottomSlideUp from "@/components/modals/BottomSlideup";

import { useImageActions } from "@/hooks/useImageActions";
import { type ImageSource } from "expo-image";
import { useRef, useState } from "react";
import { StyleSheet, type View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  const {
    selectedImage,
    setSelectedImage,
    pickImageAsync,
    makePhoto,
    makeScreenshot,
  } = useImageActions();

  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );

  const imageRef = useRef<View | Node>(null);

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
          onSaveImage={() => makeScreenshot(imageRef)}
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
