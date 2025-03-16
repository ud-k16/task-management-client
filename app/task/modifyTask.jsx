import { View, StyleSheet, FlatList } from "react-native";
import TaskCard from "@/src/task/components/taskCard";
import { useTaskContext } from "@/src/task/context/useTaskContext";
import useTasks from "@/src/task/hooks/useTasks";
import Loader from "@/src/common/components/Loader";
import EmptyContent from "@/app/common/EmptyScreen";
import { Snackbar, useTheme } from "react-native-paper";

const ModifyTask = () => {
  const { tasks } = useTaskContext();
  const {
    isLoading,
    snackBarMessage,
    snackBarVisibility,
    fetchTaskFromServer,
    deleteTaskToServer,
    hideSnackBar,
    updateTaskToServer,
  } = useTasks({});
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />
      <FlatList
        renderItem={({ item }) => (
          <TaskCard
            description={item.description}
            task={item.title}
            editable={true}
            onEdit={({ title, description }) => {
              updateTaskToServer({ id: item._id, title, description });
            }}
            onDelete={() => {
              deleteTaskToServer(item._id);
            }}
          />
        )}
        refreshing={isLoading}
        onRefresh={fetchTaskFromServer}
        data={tasks}
        ListEmptyComponent={<EmptyContent />}
      />
      <Snackbar
        visible={snackBarVisibility}
        children={snackBarMessage}
        onDismiss={hideSnackBar}
        onIconPress={hideSnackBar}
      />
    </View>
  );
};

export default ModifyTask;
