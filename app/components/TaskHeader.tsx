import { StyleSheet, Text, View } from "react-native";

type TaskHeaderProps = {
  tasksLabel: string;
};

export function TaskHeader({ tasksLabel }: Readonly<TaskHeaderProps>) {
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

const styles = StyleSheet.create({
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
});
