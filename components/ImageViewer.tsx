import { Image, type ImageSource } from "expo-image";
import { type ImageStyle, type StyleProp, StyleSheet } from "react-native";

type Props = {
  initialPlaceholder: ImageSource;
  selectedImage?: string;
  imageStyle: StyleProp<ImageStyle>;
};

export default function ImageViewer({
  initialPlaceholder,
  selectedImage,
}: Props) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : initialPlaceholder;

  return <Image source={imageSource} style={[styles.image]} />;
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 18,
    width: "100%",
    height: "100%",
  },
});
