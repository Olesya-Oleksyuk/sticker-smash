import { Image, type ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

type Props = {
  initialPlaceholder: ImageSource;
  selectedImage?: string;
};

export default function ImageViewer({ initialPlaceholder, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : initialPlaceholder;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: '100%', 
    borderRadius: 18,
  },
});
