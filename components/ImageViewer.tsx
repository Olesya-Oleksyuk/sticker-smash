import { Image, type ImageSource } from "expo-image";
import { type ImageStyle, type StyleProp, StyleSheet } from "react-native";

type Props = {
  initialPlaceholder: ImageSource;
  selectedImage?: string;
  imageStyle: StyleProp<ImageStyle>;
};

export default function ImageViewer({ initialPlaceholder, selectedImage, imageStyle }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : initialPlaceholder;

  return <Image source={imageSource} style={[styles.image, imageStyle]} />;
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 18,
  },
});

