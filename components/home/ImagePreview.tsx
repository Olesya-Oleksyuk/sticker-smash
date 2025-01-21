import EmojiSticker from "@/components/home/EmojiSticker";
import ImageViewer from "@/components/ImageViewer";
import { type ImageSource } from "expo-image";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ImagePreviewProps = {
    selectedImage?: string;
    pickedEmoji?: ImageSource;
    style?: StyleProp<ViewStyle>;
  };

export default function ImagePreview({ selectedImage, pickedEmoji, style }: ImagePreviewProps) {
  const PlaceholderImage = require("@/assets/images/default-picture.jpg");

  return (
    <View style={[styles.imageContainer, style]}>
      <ImageViewer initialPlaceholder={PlaceholderImage} selectedImage={selectedImage} />
      {pickedEmoji && <EmojiSticker imageSize={40} stickerSrc={pickedEmoji} style={styles.emojiSticker} />}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emojiSticker: {
    position: "absolute",
    top: "50%",
  },
});
