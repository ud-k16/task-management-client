import { StyleSheet, View, Pressable } from "react-native";

import moderateScale from "@/src/utils/responsiveScale";
import { Text, TextInput, useTheme } from "react-native-paper";
import { useState } from "react";
const EditTask = ({
  onEdit = () => {},
  task = "",
  description = "",
  hideEdit = () => {},
}) => {
  const [state, setState] = useState({
    task,
    description,
    taskError: "",
    descriptionError: "",
  });
  const { colors } = useTheme();
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
    editContainer: {
      marginVertical: moderateScale(5),
      rowGap: moderateScale(15),
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
    <View style={styles.editContainer}>
      <TextInput
        defaultValue={state.task ?? ""}
        mode="outlined"
        placeholderTextColor={colors.outline}
        activeOutlineColor={state.taskError ? colors.error : colors.secondary}
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
        defaultValue={state.description ?? ""}
        placeholder="Task Description"
        placeholderTextColor={colors.outline}
        textAlignVertical="top"
        mode="outlined"
        style={{ height: moderateScale(100) }}
        activeOutlineColor={state.description ? colors.error : colors.secondary}
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
  );
};
export default EditTask;
