import Button, { ButtonTheme } from "@/components/Button";
import useScreenOrientation from "@/hooks/useScreenOrientation";
import * as ScreenOrientation from "expo-screen-orientation";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ActionButtonsProps = {
  onPickImage: () => void;
  onMakePhoto: () => void;
  onUsePhoto: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
};

export default function ActionButtons({
  onPickImage,
  onMakePhoto,
  onUsePhoto,
  className,
}: ActionButtonsProps) {
  const { orientation } = useScreenOrientation();

  const isPortrait = () =>
    orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
    orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;

  return (
    <View className={className} style={[styles.ButtonsContainer]}>
      <Button
        label="Select a picture"
        theme={ButtonTheme.PRIMARY}
        icon="image"
        onPress={onPickImage}
        className={isPortrait() ? "w-full" : "w-fit"}
      />
      <Button
        label="Make a photo"
        theme={ButtonTheme.PRIMARY}
        icon="camera"
        onPress={onMakePhoto}
        className={isPortrait() ? "w-full" : "w-fit"}
      />
      <Button
        label="Use this photo"
        onPress={onUsePhoto}
        className={isPortrait() ? "w-full" : "w-fit"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonsContainer: {
    // flex: 1,
    // width: "100%",
    paddingHorizontal: 20,
  },
  cameraButton: {
    marginTop: 10,
  },
});
