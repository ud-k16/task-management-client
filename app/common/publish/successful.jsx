import { Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import moderateScale from "@/src/utils/responsiveScale";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";
const Successful = () => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    iconStyle: {
      color: colors.secondary,
    },
    textStyle: {
      fontWeight: 600,
      fontSize: moderateScale(20),
    },
    backButton: {
      width: moderateScale(150),
      alignItems: "center",
      justifyContent: "center",
      marginTop: moderateScale(40),
      borderWidth: 1,
      borderRadius: moderateScale(5),
      height: moderateScale(35),
    },
  });
  return (
    <View style={styles.container}>
      <Feather name="check-circle" size={44} color={styles.iconStyle.color} />
      <Text style={styles.textStyle}>Published</Text>
      <Pressable
        style={styles.backButton}
        onPress={() => {
          router.dismissAll();
        }}
      >
        <Text>Back</Text>
      </Pressable>
    </View>
  );
};

export default Successful;
