import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView, StyleSheet, View } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { useState } from "react";
import moderateScale from "@/src/utils/responsiveScale";
import { Text, useTheme } from "react-native-paper";
import EditTask from "./editTask";

const TaskCard = ({
  task,
  description,
  editable = false,
  onDelete = () => {},
  onEdit = () => {},
}) => {
  const { colors } = useTheme();
  const [editVisible, setEditVisible] = useState(false);

  const showEdit = () => setEditVisible(true);
  const hideEdit = () => setEditVisible(false);

  const styles = StyleSheet.create({
    container: {},
    courseDatacontainer: {
      minHeight: moderateScale(50),
      height: moderateScale(100),
      flexDirection: "row",
      width: "90%",
      alignSelf: "center",
      alignItems: "center",
      borderColor: colors.secondary,
      borderWidth: moderateScale(2),
      marginVertical: moderateScale(5),
      padding: moderateScale(10),
      borderRadius: moderateScale(5),
    },

    displayStack1: {
      height: "100%",
      flex: 2,
    },
    displayStack2: {
      flexDirection: "row",
    },
    displayStack3: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-evenly",
    },
    taskTextStyle: {
      fontWeight: 600,
      fontSize: moderateScale(20),
      color: colors.primary,
    },
    descriptionTextStyle: {
      color: colors.outlineVariant,
    },
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        {!!editVisible && !!editable ? (
          <EditTask
            hideEdit={hideEdit}
            onSave={onEdit}
            task={task}
            description={description}
          />
        ) : (
          <View style={styles.courseDatacontainer}>
            <View style={styles.displayStack1}>
              <Text style={styles.taskTextStyle}>{task}</Text>
              <Text style={styles.descriptionTextStyle}>{description}</Text>
            </View>
            {!!editable && (
              <View style={styles.displayStack3}>
                <AntDesign
                  name="delete"
                  size={24}
                  color={colors.primary}
                  onPress={onDelete}
                />
                <Foundation
                  name="page-edit"
                  size={24}
                  color={colors.primary}
                  onPress={showEdit}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default TaskCard;
