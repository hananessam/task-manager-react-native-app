import { useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TaskEmptyState } from "./components/TaskEmptyState";
import { TaskHeader } from "./components/TaskHeader";
import { TaskInput } from "./components/TaskInput";
import { TaskItem } from "./components/TaskItem";
import { useTaskTheme } from "./theme/ThemeContext";
import { Task } from "./types/task";

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState("");
  const { theme } = useTaskTheme();

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
    <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} theme={theme} />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.screenBackground }]}
      edges={["top", "bottom"]}
    >
      <TaskHeader tasksLabel={tasksLabel} theme={theme} />

      <TaskInput
        description={description}
        onChangeDescription={setDescription}
        onAddTask={addTask}
        theme={theme}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.listContent, !hasTasks && styles.emptyListContent]}
        ListEmptyComponent={<TaskEmptyState theme={theme} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  listContent: {
    paddingBottom: 24,
    gap: 10,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: "center",
  },
});
