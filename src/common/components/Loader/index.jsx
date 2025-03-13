import { useTheme } from "react-native-paper";
import { ActivityIndicator } from "react-native-web";
const Loader = ({ isLoading, color, size = "large" }) => {
  const themes = useTheme();
  return (
    <ActivityIndicator
      animating={isLoading}
      color={color ? color : themes.colors.primary}
      size={size}
    />
  );
};
export default Loader;
