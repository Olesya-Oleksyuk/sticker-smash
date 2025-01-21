import ActionButtons from "@/components/home/ActionButtons";
import ImagePreview from "@/components/home/ImagePreview";
import OptionsButtons from "@/components/home/OptionsButtons";
import { useImageActions } from "@/hooks/useImageActions";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { selectedImage, setSelectedImage, pickImageAsync, makePhoto } =
    useImageActions();

  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const handleUsePhoto = () => {
    setSelectedImage(undefined);
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // implement this later
  };

  const onSaveImageAsync = async () => {
    // implement this later
  };

  return (
    <View style={styles.container}>
      <ImagePreview
        selectedImage={selectedImage}
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
          onSaveImageAsync={onSaveImageAsync}
          onAddSticker={onAddSticker}
          onReset={onReset}
          style={styles.optionsButtonsContainer}
        />
      )}
    </View>
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
