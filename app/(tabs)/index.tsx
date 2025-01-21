import ActionButtons from "@/components/home/ActionButtons";
import ImagePreview from "@/components/home/ImagePreview";
import { useImageActions } from "@/hooks/useImageActions";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { selectedImage, setSelectedImage, pickImageAsync, makePhoto } =
    useImageActions();

  const handleUsePhoto = () => {
    setSelectedImage(undefined);
  };

  return (
    <View style={styles.container}>
      <ImagePreview selectedImage={selectedImage} style={styles.imagePreviewContainer}/>
      <ActionButtons
        onPickImage={pickImageAsync}
        onMakePhoto={makePhoto}
        onUsePhoto={handleUsePhoto}
        style={styles.actionButtonsContainer}
      />
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
    flex: 3/5,
  },
  actionButtonsContainer: {
    flex: 2/5,
  },
});
