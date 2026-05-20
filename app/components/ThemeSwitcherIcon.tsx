import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import { useTaskTheme } from "../theme/ThemeContext";

export function ThemeSwitcherIcon() {
  const { isDark, toggleTheme, theme } = useTaskTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Toggle theme"
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.iconButton,
        {
          backgroundColor: theme.panelBackground,
          borderColor: theme.panelBorder,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
      ]}
    >
      <Ionicons
        name={isDark ? "moon" : "sunny"}
        size={18}
        color={isDark ? theme.subtitleText : theme.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    borderWidth: 1,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
});
