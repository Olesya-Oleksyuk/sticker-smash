import { type ImageSource } from "expo-image";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  imageSize: number;
  stickerSrc: ImageSource;
  style?: StyleProp<ViewStyle>;
};

export default function EmojiSticker({ imageSize, stickerSrc, style }: Props) {
  const scaleImage = useSharedValue(imageSize);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  return (
    <View style={[styles.emojiContainer, style]}>
      <GestureDetector gesture={doubleTap}>
        <Animated.Image
          source={stickerSrc}
          resizeMode="contain"
          style={imageStyle}
        />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  emojiContainer: {},
});
