import ActionButtons from "@/components/home/ActionButtons";
import EmojiList from "@/components/home/EmojiList";
import ImagePreview from "@/components/home/ImagePreview";
import OptionsButtons from "@/components/home/OptionsButtons";
import BottomSlideUp from "@/components/modals/BottomSlideup";

import { useImageActions } from "@/hooks/useImageActions";
import useScreenOrientation from "@/hooks/useScreenOrientation";
import { type ImageSource } from "expo-image";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { twMerge } from "tailwind-merge";

export default function Index() {
  const {
    selectedImage,
    setSelectedImage,
    pickImageAsync,
    makePhoto,
    makeScreenshot,
  } = useImageActions();

  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );

  const { orientation } = useScreenOrientation();

  // useEffect(() => {
  //   async function checkOrientation() {
  //     const test = await ScreenOrientation.getOrientationAsync();
  //   }
  //   checkOrientation();
  // }, []);

  const imageRef = useRef<View | Node>(null);

  const handleUsePhoto = () => {
    setSelectedImage(undefined);
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const isPortrait = () =>
    orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
    orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;

  const containerClasses = {
    portrait: "flex-col",
    landscape: "flex-row",
  };

  // const layout = tv({
  //   variants: {
  //     default: {
  //       container: 'bg-[#25292e] flex-1 gap-6',
  //       imagePreview: 'text-white dark:text-black',
  //     },
  //     portrait: {
  //       container: 'flex-col',
  //       imagePreview: 'flex-col',
  //     },
  //     landscape: {
  //       container: 'flex-row',
  //     },
  //   },
  //   // defaultVariants: {
  //   //   variant: 'default',
  //   //   disabled: false,
  //   //   fullWidth: true,
  //   //   size: 'default',
  //   // },
  // });

  // const styles = React.useMemo(
  //   () => layout({ variant, disabled, size }),
  //   [variant, disabled, size]
  // );

  const containerStyle = useMemo(
    () =>
      twMerge(
        "bg-[#25292e] flex-1 gap-6",
        isPortrait() ? containerClasses.portrait : containerClasses.landscape
      ),
    [orientation]
  );

  return (
    <GestureHandlerRootView>
      <View className={containerStyle}>
        <ImagePreview
          imageRef={imageRef}
          selectedImage={selectedImage}
          pickedEmoji={pickedEmoji}
          className="flex-grow px-5"
        />

        {!showAppOptions ? (
          <ActionButtons
            onPickImage={() => {
              pickImageAsync();
              setShowAppOptions(true);
            }}
            onMakePhoto={() => {
              makePhoto();
              setShowAppOptions(true);
            }}
            onUsePhoto={() => {
              handleUsePhoto();
              setShowAppOptions(true);
            }}
            className="justify-center items-center gap-3"
          />
        ) : (
          <OptionsButtons
            onSaveImage={() => makeScreenshot(imageRef)}
            onAddSticker={onAddSticker}
            onReset={onReset}
            className="mb-6 items-center justify-center"
          />
        )}
        <BottomSlideUp
          isVisible={isModalVisible}
          height={"25%"}
          onClose={onModalClose}
        >
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </BottomSlideUp>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   gap: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#25292e",
  // },
  imagePreviewContainer: {
    flex: 3 / 5,
  },
  // actionButtonsContainer: {
  //   flex: 2 / 5,
  // },
  // optionsButtonsContainer: {
  //   flex: 1 / 5,
  // },
});
