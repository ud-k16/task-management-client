import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import TaskCard from "@/src/task/components/taskCard";
import { useTaskContext } from "@/src/task/context/useTaskContext";
import useTasks from "@/src/task/hooks/useTasks";
import Loader from "@/src/common/components/Loader";
import EmptyContent from "@/app/common/EmptyScreen";
import moderateScale from "@/src/utils/responsiveScale";
import { useCallback, useState } from "react";
import { Snackbar, useTheme } from "react-native-paper";
import { useErrorContext } from "@/src/common/context/useErrorContext";
const TaskHome = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { tasks } = useTaskContext();
  const { isLoading, showSnackBar, fetchTaskFromServer } = useTasks({});
  const { colors } = useTheme();
  const { errorVisible, errorMessage, hideError } = useErrorContext();
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
          renderItem={({ item }) => (
            <TaskCard description={item.description} task={item.title} />
          )}
          style={{
            paddingTop: moderateScale(5),
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={tasks}
          ListEmptyComponent={<EmptyContent />}
        />
      </ScrollView>
      <Snackbar
        visible={errorVisible}
        children={errorMessage}
        onDismiss={hideError}
        onIconPress={hideError}
      />
    </View>
  );
};

export default TaskHome;
