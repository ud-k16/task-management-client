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
    deleteTaskToServer,
    hideSnackBar,
  } = useTasks();
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
            onDelete={() => {
              deleteTaskToServer(item._id);
            }}
          />
        )}
        data={tasks}
        ListEmptyComponent={<EmptyContent />}
      />
      <Snackbar
        visible={snackBarVisibility}
        children={snackBarMessage}
        onDismiss={hideSnackBar}
      />
    </View>
  );
};

export default ModifyTask;
