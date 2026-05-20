import { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import { TaskTheme } from "../theme/taskTheme";
import { Task } from "../types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  theme: TaskTheme;
};

export function TaskItem({
  task,
  onToggle,
  onDelete,
  theme,
}: Readonly<TaskItemProps>) {
  const styles = useMemo(() => createStyles(theme), [theme]);
  const completedProgress = useSharedValue(task.completed ? 1 : 0);

  completedProgress.value = withTiming(task.completed ? 1 : 0, {
    duration: 180,
  });

  const animatedRowStyle = useAnimatedStyle(() => {
    const scale = 1 - completedProgress.value * 0.02;
    const opacity = 1 - completedProgress.value * 0.2;

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.taskRow, animatedRowStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={task.completed ? "Mark as incomplete" : "Mark as complete"}
        onPress={() => onToggle(task.id)}
        style={[styles.checkButton, task.completed && styles.checkButtonCompleted]}
      >
        {task.completed ? <Text style={styles.checkMark}>✓</Text> : null}
      </Pressable>

      <Text
        selectable
        numberOfLines={2}
        style={[styles.taskText, task.completed && styles.taskTextCompleted]}
      >
        {task.description}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Delete task"
        onPress={() => onDelete(task.id)}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </Animated.View>
  );
}

const createStyles = (theme: TaskTheme) =>
  StyleSheet.create({
    taskRow: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 12,
      backgroundColor: theme.taskRowBackground,
      borderWidth: 1,
      borderColor: theme.taskRowBorder,
      gap: 10,
    },
    checkButton: {
      width: 28,
      height: 28,
      borderRadius: 999,
      borderWidth: 2,
      borderColor: theme.checkBorder,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.taskRowBackground,
    },
    checkButtonCompleted: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    checkMark: {
      color: theme.primaryText,
      fontWeight: "800",
      fontSize: 14,
    },
    taskText: {
      flex: 1,
      color: theme.taskText,
      fontSize: 16,
    },
    taskTextCompleted: {
      color: theme.taskTextCompleted,
      textDecorationLine: "line-through",
    },
    deleteButton: {
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: theme.deleteBackground,
      borderWidth: 1,
      borderColor: theme.deleteBorder,
    },
    deleteButtonPressed: {
      opacity: 0.75,
    },
    deleteButtonText: {
      color: theme.deleteText,
      fontSize: 13,
      fontWeight: "700",
    },
  });
