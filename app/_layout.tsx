import { Stack } from "expo-router";

import { ThemeSwitcherIcon } from "./components/ThemeSwitcherIcon";
import { ThemeProvider, useTaskTheme } from "./theme/ThemeContext";

function RootStack() {
  const { theme } = useTaskTheme();

  return (
    <Stack
      screenOptions={{
        headerTitle: "To-Do List",
        headerStyle: {
          backgroundColor: theme.screenBackground,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          color: theme.titleText,
        },
        headerRight: ThemeSwitcherIcon,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}
