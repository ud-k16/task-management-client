import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "@/src/utils/themes";
import AuthContextProvider from "@/src/common/context/useAuthContext";
export default function RootLayout() {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const isDarkMode = colorScheme === "dark";
  return (
    <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AuthContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthContextProvider>
    </PaperProvider>
  );
}
