import { StyleSheet, Text, View } from "react-native";
import moderateScale from "@/src/utils/responsiveScale";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Menu, useTheme } from "react-native-paper";
import useLogout from "@/src/auth/hooks/useLogout";
import { useAuthContext } from "@/src/auth/context/useAuthContext";

const Header = ({ title = "Task Management" }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { logoutUser } = useLogout();
  const { authenticated } = useAuthContext();
  const Themes = useTheme();
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const styles = StyleSheet.create({
    container: {
      height: moderateScale(70),
      borderWidth: 0,
      backgroundColor: Themes.colors.secondary,
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    titleTextStyle: {
      fontWeight: 600,
      fontSize: moderateScale(26),
      flex: authenticated ? 0.8 : 0.9,
      color: Themes.colors.onSecondary,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>{title}</Text>
      {authenticated && (
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
              onPress={() => {
                hideModal();
                logoutUser();
              }}
            />
          </Menu>
        </View>
      )}
    </View>
  );
};

export default Header;
