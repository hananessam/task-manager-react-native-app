import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Task } from "../types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onToggle, onDelete }: Readonly<TaskItemProps>) {
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

const styles = StyleSheet.create({
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E6F4",
    gap: 10,
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#87B9E9",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkButtonCompleted: {
    backgroundColor: "#208AEF",
    borderColor: "#208AEF",
  },
  checkMark: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
  },
  taskText: {
    flex: 1,
    color: "#193F64",
    fontSize: 16,
  },
  taskTextCompleted: {
    color: "#95A2B1",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#FFD9D9",
  },
  deleteButtonPressed: {
    opacity: 0.75,
  },
  deleteButtonText: {
    color: "#C23333",
    fontSize: 13,
    fontWeight: "700",
  },
});
