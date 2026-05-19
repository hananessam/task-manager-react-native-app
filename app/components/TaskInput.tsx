import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type TaskInputProps = {
  description: string;
  onChangeDescription: (value: string) => void;
  onAddTask: () => void;
};

export function TaskInput({
  description,
  onChangeDescription,
  onAddTask,
}: Readonly<TaskInputProps>) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        placeholder="Add a new task"
        placeholderTextColor="#8A97A8"
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

const styles = StyleSheet.create({
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
});
