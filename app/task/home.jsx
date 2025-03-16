import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import TaskCard from "@/src/task/components/taskCard";
import { useTaskContext } from "@/src/task/context/useTaskContext";
import useTasks from "@/src/task/hooks/useTasks";
import Loader from "@/src/common/components/Loader";
import EmptyContent from "@/app/common/EmptyScreen";
import moderateScale from "@/src/utils/responsiveScale";
const TaskHome = () => {
  const { tasks } = useTaskContext();
  const { isLoading, fetchTaskFromServer } = useTasks({});
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  if (isLoading) return <Loader />;
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <FlatList
          renderItem={({ item }) => (
            <TaskCard description={item.description} task={item.title} />
          )}
          style={{
            paddingTop: moderateScale(5),
          }}
          refreshing={isLoading}
          onRefresh={fetchTaskFromServer}
          data={tasks}
          ListEmptyComponent={<EmptyContent />}
        />
      </ScrollView>
    </View>
  );
};

export default TaskHome;
