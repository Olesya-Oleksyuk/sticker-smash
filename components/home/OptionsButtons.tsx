import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import { StyleSheet, View } from "react-native";
import {useMemo} from "react";
import {twMerge} from "tailwind-merge";
import useScreenOrientation from "@/hooks/useScreenOrientation";
import * as ScreenOrientation from "expo-screen-orientation";

type ActionButtonsProps = {
  onSaveImage: () => void;
  onAddSticker: () => void;
  onReset: () => void;
  className?: string;
};

export default function ActionButtons({
  onSaveImage,
  onAddSticker,
  onReset,
  className,
}: ActionButtonsProps) {

  const { orientation } = useScreenOrientation();
  const isPortrait = () =>
    orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
    orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;

  const containerClasses = {
    portrait: "flex-row",
    landscape: "flex-col me-6 justify-center items-center",
  };

  const containerStyle = useMemo(
    () =>
      twMerge(
        "items-center justify-between gap-8",
        isPortrait() ? containerClasses.portrait : containerClasses.landscape
      ),
    [orientation]
  );

  return (
    <View className={className}>
      <View className={containerStyle}>
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
