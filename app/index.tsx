import { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = {
  id: string;
  description: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function TaskItem({ task, onToggle, onDelete }: Readonly<TaskItemProps>) {
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

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState("");

  const hasTasks = tasks.length > 0;

  const tasksLabel = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((task) => task.completed).length;
    return `${done}/${total} done`;
  }, [tasks]);

  const addTask = () => {
    const trimmed = description.trim();

    if (!trimmed) {
      return;
    }

    setTasks((current) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        description: trimmed,
        completed: false,
      },
      ...current,
    ]);
    setDescription("");
  };

  const toggleTask = (id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text selectable style={styles.title}>
          Task Manager
        </Text>
        <Text selectable style={styles.subtitle}>
          {tasksLabel}
        </Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add a new task"
          placeholderTextColor="#8A97A8"
          value={description}
          onChangeText={setDescription}
          onSubmitEditing={addTask}
          returnKeyType="done"
          style={styles.input}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add task"
          onPress={addTask}
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.listContent, !hasTasks && styles.emptyListContent]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text selectable style={styles.emptyTitle}>
              No tasks yet
            </Text>
            <Text selectable style={styles.emptyDescription}>
              Add your first task above and start checking things off.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F7FC",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    marginTop: 8,
    marginBottom: 14,
    gap: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#113B67",
  },
  subtitle: {
    fontSize: 14,
    color: "#4B6682",
    fontVariant: ["tabular-nums"],
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#C7D9EC",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#12385E",
  },
  addButton: {
    height: 48,
    minWidth: 76,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    backgroundColor: "#208AEF",
  },
  addButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 24,
    gap: 10,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: "center",
  },
  emptyState: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#EAF3FD",
    borderWidth: 1,
    borderColor: "#C7D9EC",
    gap: 6,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#12385E",
  },
  emptyDescription: {
    fontSize: 14,
    color: "#4B6682",
    lineHeight: 20,
  },
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
