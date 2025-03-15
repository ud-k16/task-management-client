import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

const Loader = ({ isLoading, color, size = "large" }) => {
  const themes = useTheme();
  if (isLoading)
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 500,
          position: "absolute",
          backgroundColor: themes.colors.backdrop,
        }}
      >
        <ActivityIndicator
          animating={isLoading ?? false}
          color={color ? color : themes.colors.primary}
          size={size}
        />
      </View>
    );
};
export default Loader;
