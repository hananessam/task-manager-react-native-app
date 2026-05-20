import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { TaskTheme } from "../theme/taskTheme";

type TaskHeaderProps = {
  tasksLabel: string;
  theme: TaskTheme;
};

export function TaskHeader({ tasksLabel, theme }: Readonly<TaskHeaderProps>) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.header}>
      <Text selectable style={styles.title}>
        Task Manager
      </Text>
      <Text selectable style={styles.subtitle}>
        {tasksLabel}
      </Text>
    </View>
  );
}

const createStyles = (theme: TaskTheme) =>
  StyleSheet.create({
    header: {
      marginTop: 8,
      marginBottom: 14,
      gap: 4,
    },
    title: {
      fontSize: 30,
      fontWeight: "800",
      color: theme.titleText,
    },
    subtitle: {
      fontSize: 14,
      color: theme.subtitleText,
      fontVariant: ["tabular-nums"],
    },
  });
