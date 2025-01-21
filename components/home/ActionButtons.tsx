import Button, { ButtonTheme } from "@/components/Button";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ActionButtonsProps = {
  onPickImage: () => void;
  onMakePhoto: () => void;
  onUsePhoto: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function ActionButtons({
  onPickImage,
  onMakePhoto,
  onUsePhoto,
  style
}: ActionButtonsProps) {
  return (
    <View style={[styles.ButtonsContainer, style]}>
      <Button
        label="Choose a photo"
        theme={ButtonTheme.PRIMARY}
        icon="image"
        onPress={onPickImage}
      />
      <Button
        label="Make a photo"
        theme={ButtonTheme.PRIMARY}
        icon="camera"
        onPress={onMakePhoto}
        style={styles.cameraButton}
      />
      <Button label="Use this photo" onPress={onUsePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonsContainer: {
    flex: 1,

  },
  cameraButton: {
    marginTop: 10,
  },
});
