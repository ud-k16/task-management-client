import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import useLogin from "@/src/auth/hooks/useLogin";
import Header from "@/src/common/components/Header";

const Login = () => {
  const { email, password, setState } = useLogin();
  return (
    <View style={styles.container}>
      <Header title="Login" />
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={(text) => setState((prev) => ({ ...prev, email: text }))}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={(text) =>
          setState((prev) => ({ ...prev, password: text }))
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Login;
