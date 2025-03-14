import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, StyleSheet, View } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { useState } from "react";
import moderateScale from "@/src/utils/responsiveScale";
import { Text, TextInput, useTheme } from "react-native-paper";

const TaskCard = ({
  id = 0,
  task,
  description,
  editable = false,
  onDelete = () => {},
  onEdit = () => {},
}) => {
  const { colors } = useTheme();
  const [editVisible, setEditVisible] = useState(false);
  const [state, setState] = useState({
    task,
    description,
    taskError: "",

    descriptionError: "",
  });
  const showEdit = () => setEditVisible(true);
  const hideEdit = () => setEditVisible(false);
  const validation = () => {
    if (state.task && state.description) {
      onEdit({
        id,
        task: state.task,
        description: state.description,
      });
      hideEdit();
    } else {
      setState((prev) => ({
        ...prev,
        taskError: !Boolean(prev.task),

        descriptionError: !Boolean(prev.description),
      }));
    }
  };
  const resetState = () => {
    hideEdit();
    setState((prev) => ({
      ...prev,
      task,
      description,

      taskError: "",

      descriptionError: "",
    }));
  };
  const styles = StyleSheet.create({
    courseDatacontainer: {
      minHeight: moderateScale(50),
      height: moderateScale(100),
      flexDirection: "row",
      width: "90%",
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      marginVertical: moderateScale(5),
      padding: moderateScale(10),
      borderRadius: moderateScale(5),
      elevation: 6,
    },
    editContainer: {
      marginVertical: moderateScale(5),
      rowGap: moderateScale(15),
    },
    displayStack1: {
      justifyContent: "space-evenly",
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
    teacherTextStyle: {
      color: colors.lightFadedGreen,
    },
    textInputStyle: {
      alignSelf: "center",
      width: "90%",
      height: moderateScale(60),
      elevation: 6,
      backgroundColor: colors.white,
      // borderWidth: moderateScale(2),
      borderRadius: moderateScale(5),
      paddingHorizontal: moderateScale(10),
      fontSize: moderateScale(17),
    },
    taskTextStyle: {
      fontWeight: 600,
      fontSize: moderateScale(20),
    },
    descriptionTextStyle: {
      color: colors.greyShade,
    },
    actionButton: {
      alignSelf: "center",
      width: moderateScale(100),
      height: moderateScale(40),
      borderRadius: moderateScale(5),
      alignItems: "center",
      justifyContent: "center",
      color: colors.white,
      backgroundColor: colors.secondary,
    },
    actionContainer: {
      alignSelf: "center",
      flexDirection: "row",
      width: "80%",
      justifyContent: "space-evenly",
    },
    errorTextStyle: {
      alignSelf: "center",
      color: colors.error,
      fontWeight: 600,
    },
    errorStyle: {
      borderColor: colors.error,
      borderWidth: moderateScale(2),
    },
  });
  return (
    <View style={styles.container}>
      {!!editVisible && !!editable ? (
        <View style={styles.editContainer}>
          <TextInput
            style={[state.taskError && styles.errorStyle]}
            defaultValue={task ?? ""}
            placeholder="Task Title "
            onChangeText={(text) =>
              setState((prev) => ({
                ...prev,
                task: text,
              }))
            }
          />

          <TextInput
            multiline
            defaultValue={description ?? ""}
            placeholder="Task Description"
            style={[
              { height: moderateScale(100), textAlignVertical: "top" },
              state.descriptionError && styles.errorStyle,
            ]}
            onChangeText={(text) =>
              setState((prev) => ({
                ...prev,
                description: text,
              }))
            }
          />
          {(state.descriptionError || state.taskError) && (
            <Text style={styles.errorTextStyle}> *Fill All Fields</Text>
          )}
          <View style={styles.actionContainer}>
            <Pressable
              style={styles.actionButton}
              onPress={() => {
                resetState();
              }}
            >
              <Text style={{ color: styles.actionButton.color }}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.actionButton}
              onPress={() => {
                validation();
              }}
            >
              <Text style={{ color: styles.actionButton.color }}>Save</Text>
            </Pressable>
          </View>
        </View>
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
                color="black"
                onPress={onDelete}
              />
              <Foundation
                name="page-edit"
                size={24}
                color="black"
                onPress={showEdit}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};
export default TaskCard;
