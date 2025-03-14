import { ActivityIndicator, useTheme } from "react-native-paper";

const Loader = ({ isLoading, color, size = "large" }) => {
  const themes = useTheme();
  return (
    <ActivityIndicator
      animating={isLoading ?? false}
      color={color ? color : themes.colors.primary}
      size={size}
    />
  );
};
export default Loader;
