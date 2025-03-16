import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import TaskCard from "@/src/task/components/taskCard";
import { useTaskContext } from "@/src/task/context/useTaskContext";
import useTasks from "@/src/task/hooks/useTasks";
import Loader from "@/src/common/components/Loader";
import EmptyContent from "@/app/common/EmptyScreen";
import { Snackbar, useTheme } from "react-native-paper";
import moderateScale from "@/src/utils/responsiveScale";
import { useCallback, useState } from "react";

const ModifyTask = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { tasks } = useTaskContext();
  const {
    isLoading,
    snackBarMessage,
    snackBarVisibility,
    fetchTaskFromServer,
    deleteTaskToServer,
    hideSnackBar,
    showSnackBar,
    updateTaskToServer,
  } = useTasks({});
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchTaskFromServer();
    } catch (error) {
      showSnackBar();
    } finally {
      setRefreshing(false);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading && !refreshing} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <FlatList
          style={{
            paddingTop: moderateScale(5),
          }}
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
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={tasks}
          ListEmptyComponent={<EmptyContent />}
        />
      </ScrollView>

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
