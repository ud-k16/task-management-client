import { StyleSheet, Text, View } from "react-native";
import moderateScale from "@/src/utils/responsiveScale";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Menu, useTheme } from "react-native-paper";
import useLogout from "@/src/auth/hooks/useLogout";

const Header = ({ title = "" }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { logoutUser } = useLogout();
  const Themes = useTheme();
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const styles = StyleSheet.create({
    container: {
      height: moderateScale(40),
      borderWidth: 0,
      borderBottomWidth: moderateScale(1),
      marginBottom: moderateScale(2),
      backgroundColor: Themes.colors.secondary,
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
      minHeight: moderateScale(70),
    },
    titleTextStyle: {
      fontWeight: 600,
      fontSize: moderateScale(26),
      textTransform: "uppercase",
      flex: 0.8,
      color: Themes.colors.secondary,
    },
    menuContainer: {
      color: Themes.colors.primary,
      backgroundColor: Themes.colors.background,
      width: "50%",
      elevation: 16,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>{title}</Text>
      <View>
        <Menu
          visible={modalVisible}
          onDismiss={hideModal}
          anchor={
            <MaterialCommunityIcons
              name="menu"
              size={24}
              color={Themes.colors.background}
              onPress={showModal}
            />
          }
        >
          <Menu.Item
            title="Logout"
            onPress={logoutUser}
            // trailingIcon={
            //   <MaterialIcons name="account-circle" size={24} color="black" />
            // }
          />
        </Menu>
      </View>
    </View>
  );
};

export default Header;
