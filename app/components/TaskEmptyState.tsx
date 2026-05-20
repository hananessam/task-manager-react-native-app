import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { TaskTheme } from "../theme/taskTheme";

type TaskEmptyStateProps = {
  theme: TaskTheme;
};

export function TaskEmptyState({ theme }: Readonly<TaskEmptyStateProps>) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.emptyState}>
      <Text selectable style={styles.emptyTitle}>
        No tasks yet
      </Text>
      <Text selectable style={styles.emptyDescription}>
        Add your first task above and start checking things off.
      </Text>
    </View>
  );
}

const createStyles = (theme: TaskTheme) =>
  StyleSheet.create({
    emptyState: {
      borderRadius: 16,
      padding: 20,
      backgroundColor: theme.emptyBackground,
      borderWidth: 1,
      borderColor: theme.emptyBorder,
      gap: 6,
    },
    emptyTitle: {
      fontSize: 19,
      fontWeight: "700",
      color: theme.titleText,
    },
    emptyDescription: {
      fontSize: 14,
      color: theme.subtitleText,
      lineHeight: 20,
    },
  });
