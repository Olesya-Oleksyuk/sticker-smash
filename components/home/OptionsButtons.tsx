import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ActionButtonsProps = {
  onSaveImage: () => void;
  onAddSticker: () => void;
  onReset: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function ActionButtons({
  onSaveImage,
  onAddSticker,
  onReset,
  style,
}: ActionButtonsProps) {
  return (
    <View style={[styles.optionsContainer, style]}>
      <View style={styles.optionsRow}>
        <IconButton icon="refresh" label="Reset" onPress={onReset} />
        <CircleButton onPress={onAddSticker} />
        <IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {},
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
