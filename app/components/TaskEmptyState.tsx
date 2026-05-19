import { StyleSheet, Text, View } from "react-native";

export function TaskEmptyState() {
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

const styles = StyleSheet.create({
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
});
