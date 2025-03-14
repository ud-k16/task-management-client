import { View, StyleSheet, FlatList } from "react-native";
import TaskCard from "@/src/task/components/taskCard";
import { useTaskContext } from "@/src/task/context/useTaskContext";
import useTasks from "@/src/task/hooks/useTasks";
import Loader from "@/src/common/components/Loader";
import EmptyContent from "@/app/common/EmptyScreen";
const ModifyTask = () => {
  const { tasks } = useTaskContext();
  const { isLoading, fetchTaskFromServer } = useTasks();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  if (isLoading) return <Loader />;
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item }) => (
          <TaskCard
            description={item.description}
            task={item.title}
            editable={true}
          />
        )}
        data={tasks}
        ListEmptyComponent={<EmptyContent />}
      />
    </View>
  );
};

export default ModifyTask;
