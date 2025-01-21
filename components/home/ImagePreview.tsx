import EmojiSticker from "@/components/home/EmojiSticker";
import ImageViewer from "@/components/ImageViewer";
import { type ImageSource } from "expo-image";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ImagePreviewProps = {
  imageRef: React.RefObject<View>;
  selectedImage?: string;
  pickedEmoji?: ImageSource;
  style?: StyleProp<ViewStyle>;
};

export default function ImagePreview({
  imageRef,
  selectedImage,
  pickedEmoji,
  style,
}: ImagePreviewProps) {
  const PlaceholderImage = require("@/assets/images/default-picture.jpg");

  return (
    <View style={[styles.imageContainer, style]}>
      <View ref={imageRef} collapsable={false}>
        <ImageViewer
          initialPlaceholder={PlaceholderImage}
          selectedImage={selectedImage}
          imageStyle={styles.image}
        />
        {pickedEmoji && (
          <EmojiSticker
            imageSize={40}
            stickerSrc={pickedEmoji}
            style={styles.emojiSticker}
          />
        )}
      </View>
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
  image: {
    width: 320,
    height: 380,
  },
});
