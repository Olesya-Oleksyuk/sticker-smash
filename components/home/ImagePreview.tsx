import ImageViewer from "@/components/ImageViewer";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ImagePreviewProps = {
    selectedImage?: string;
    style?: StyleProp<ViewStyle>;
  };

export default function ImagePreview({ selectedImage, style }: ImagePreviewProps) {
  const PlaceholderImage = require("@/assets/images/default-picture.jpg");

  return (
    <View style={[styles.imageContainer, style]}>
      <ImageViewer initialPlaceholder={PlaceholderImage} selectedImage={selectedImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
