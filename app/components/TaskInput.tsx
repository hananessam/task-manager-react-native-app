import { useMemo } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { TaskTheme } from "../theme/taskTheme";

type TaskInputProps = {
  description: string;
  onChangeDescription: (value: string) => void;
  onAddTask: () => void;
  theme: TaskTheme;
};

export function TaskInput({
  description,
  onChangeDescription,
  onAddTask,
  theme,
}: Readonly<TaskInputProps>) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.inputRow}>
      <TextInput
        placeholder="Add a new task"
        placeholderTextColor={theme.inputPlaceholder}
        value={description}
        onChangeText={onChangeDescription}
        onSubmitEditing={onAddTask}
        returnKeyType="done"
        style={styles.input}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add task"
        onPress={onAddTask}
        style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const createStyles = (theme: TaskTheme) =>
  StyleSheet.create({
    inputRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 14,
    },
    input: {
      flex: 1,
      height: 48,
      borderWidth: 1,
      borderColor: theme.inputBorder,
      borderRadius: 14,
      backgroundColor: theme.inputBackground,
      paddingHorizontal: 14,
      fontSize: 16,
      color: theme.inputText,
    },
    addButton: {
      height: 48,
      minWidth: 76,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 14,
      backgroundColor: theme.primary,
    },
    addButtonPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
    addButtonText: {
      color: theme.primaryText,
      fontWeight: "700",
      fontSize: 15,
    },
  });
