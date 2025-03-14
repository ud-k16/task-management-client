import { View, StyleSheet, FlatList } from "react-native";
import useTasks from "@/src/task/hooks/useTasks";
import Loader from "@/src/common/components/Loader";
import EmptyContent from "@/app/common/EmptyScreen";
import EditTask from "@/src/task/components/editTask";
import { useTheme } from "react-native-paper";
const AddTask = () => {
  const { isLoading } = useTasks();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
  if (isLoading) return <Loader />;
  return (
    <View style={styles.container}>
      <EditTask />
    </View>
  );
};

export default AddTask;
