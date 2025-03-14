import { StyleSheet, Text, View } from "react-native";
const EmptyContent = () => {
  return (
    <View style={styles.container}>
      <Text> No Data Available</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default EmptyContent;
