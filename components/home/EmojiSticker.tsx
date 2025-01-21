import { Image, type ImageSource } from "expo-image";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  imageSize: number;
  stickerSrc: ImageSource;
  style?: StyleProp<ViewStyle>;
};

export default function EmojiSticker({ imageSize, stickerSrc, style }: Props) {
  return (
    <View style={[styles.emojiContainer, style]}>
      <Image
        source={stickerSrc}
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emojiContainer: {},
});
