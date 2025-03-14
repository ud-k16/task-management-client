import { View, StyleSheet, FlatList } from "react-native";
import TaskCard from "@/src/task/components/taskCard";
import { useTaskContext } from "@/src/task/context/useTaskContext";
const TaskHome = () => {
  const { isLoading } = useTaskContext();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  return (
    <View style={styles.container}>
      <FlatList renderItem={(props) => <TaskCard {...props} />} />
    </View>
  );
};

export default TaskHome;
