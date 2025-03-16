import { View, StyleSheet } from "react-native";
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import useLogin from "@/src/auth/hooks/useLogin";
import moderateScale from "@/src/utils/responsiveScale";
import { Link } from "expo-router";
import { useErrorContext } from "@/src/common/context/useErrorContext";

const Login = () => {
  const {
    isLoading,
    email,
    password,
    emailError,
    passwordError,
    setState,
    authenticateUser,
  } = useLogin();
  const { errorVisible, errorMessage, hideError } = useErrorContext();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: moderateScale(10),

      backgroundColor: colors.background,
    },
    buttonStyle: {
      width: moderateScale(150),
      height: moderateScale(50),
      alignSelf: "center",
      borderRadius: moderateScale(5),
    },
    buttonContentStyle: {
      height: "100%",
    },
    buttonLabelStyle: {
      fontSize: moderateScale(20),
    },
    errorTextStyle: {
      color: colors.error,
      marginBottom: moderateScale(20),
    },
    signUpTextLink: {
      color: colors.primary,
      marginTop: moderateScale(40),
      textAlign: "center",
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        mode="outlined"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setState((prev) => ({ ...prev, email: text }))}
      />
      <Text style={styles.errorTextStyle}>{emailError}</Text>
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        autoCapitalize="none"
        secureTextEntry
        onChangeText={(text) =>
          setState((prev) => ({ ...prev, password: text }))
        }
      />
      <Text style={styles.errorTextStyle}>{passwordError}</Text>
      <Button
        children="Login"
        loading={isLoading}
        mode="contained"
        style={styles.buttonStyle}
        labelStyle={styles.buttonLabelStyle}
        contentStyle={styles.buttonContentStyle}
        onPress={authenticateUser}
      />
      <Link href={"/auth/signup"} style={styles.signUpTextLink}>
        Signup to create an account
      </Link>
      <Snackbar
        visible={errorVisible}
        onDismiss={hideError}
        duration={5000}
        onIconPress={hideError}
      >
        {errorMessage ?? "Try again"}
      </Snackbar>
    </View>
  );
};

export default Login;
