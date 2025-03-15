import { View, StyleSheet, FlatList } from "react-native";
import useTasks from "@/src/task/hooks/useTasks";
import Loader from "@/src/common/components/Loader";
import EditTask from "@/src/task/components/editTask";
import { Snackbar, useTheme } from "react-native-paper";
const AddTask = () => {
  const {
    isLoading,
    addTaskToServer,
    snackBarVisibility,
    snackBarMessage,
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
      <EditTask
        onSave={({ title, description }) => {
          addTaskToServer({ title, description });
        }}
      />
      <Snackbar
        onDismiss={hideSnackBar}
        visible={snackBarVisibility}
        children={snackBarMessage}
      />
    </View>
  );
};

export default AddTask;
