import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import '../global.css'
import { verifyInstallation } from "nativewind";

export default function RootLayout() {

  verifyInstallation();

  return (
    <>
    <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
