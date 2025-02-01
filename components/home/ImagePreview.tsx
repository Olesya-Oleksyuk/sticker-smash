import EmojiSticker from "@/components/home/EmojiSticker";
import ImageViewer from "@/components/ImageViewer";
import { IMAGE_DIMENSIONS } from "@/constants/Others";
import { type ImageSource } from "expo-image";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ImagePreviewProps = {
  imageRef: React.RefObject<View | Node>;
  selectedImage?: string;
  pickedEmoji?: ImageSource;
  style?: StyleProp<ViewStyle>;
  className?: string;
};

export default function ImagePreview({
  imageRef,
  selectedImage,
  pickedEmoji,
  style,
  className,
}: ImagePreviewProps) {
  const PlaceholderImage = require("@/assets/images/default-picture.jpg");

  return (
    <View className={className} style={[styles.imageContainer, style]}>
      <View
        className="flex-1 w-full"
        ref={imageRef as React.RefObject<View>}
        collapsable={false}
      >
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
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emojiSticker: {
    position: "absolute",
    top: "50%",
  },
  image: {
    maxWidth: IMAGE_DIMENSIONS.width,
    width: "50%",
    height: "100%",
  },
});
