const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.oleksiuk.stickersmash.dev";
  }

  if (IS_PREVIEW) {
    return "com.oleksiuk.stickersmash.preview";
  }

  return "com.oleksiuk.stickersmash";
};

const getAppName = () => {
  if (IS_DEV) {
    return "StickerSmash (Dev)";
  }

  if (IS_PREVIEW) {
    return "StickerSmash (Preview)";
  }

  return "StickerSmash: Emoji Stickers";
};

export default {
  owner: "olesia.oleksiuk",
  name: getAppName(),
  slug: "sticker-smash",

  version: "1.0.0",
  orientation: "default",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    requireFullScreen: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon.png",
      backgroundColor: "#D9D9D9",
      package: getUniqueIdentifier(),
    },
    permissions: ["android.permission.RECORD_AUDIO"],
    package: "com.anonymous.stickersmash",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    [
      "expo-image-picker",
      {
        cameraPermission: "Allow Sticker Smash to access your camera.",
        photosPermission: "Allow Sticker Smash to access your photos.",
      },
    ],
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-screen.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#25292e",
      },
    ],
    [
      "expo-screen-orientation",
      {
        initialOrientation: "DEFAULT",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  jsEngine: "hermes",

  extra: {
    eas: {
      projectId: "a372e5f9-6189-4d20-95df-950a97835b29",
    },
  },

  updates: {
    url: "https://u.expo.dev/a372e5f9-6189-4d20-95df-950a97835b29",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
};
