import { StyleSheet, View } from "react-native";
import useSignUp from "../../src/auth/hooks/useSignUp";
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import moderateScale from "@/src/utils/responsiveScale";
import { useErrorContext } from "@/src/common/context/useErrorContext";
import { Link } from "expo-router";
const SignUp = () => {
  const { colors } = useTheme();
  const {
    isLoading,
    name,
    nameError,
    email,
    password,
    emailError,
    passwordError,
    setState,
    signupUser,
  } = useSignUp();
  const { errorVisible, errorMessage, hideError } = useErrorContext();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: moderateScale(10),
      backgroundColor: colors.background,
    },
    buttonStyle: {
      width: moderateScale(180),
      height: moderateScale(50),
      alignSelf: "center",
      borderRadius: moderateScale(5),
    },
    buttonContentStyle: {
      height: "100%",
      width: "100%",
    },
    buttonLabelStyle: {
      fontSize: moderateScale(20),
    },
    errorTextStyle: {
      color: colors.error,
      marginBottom: moderateScale(10),
    },
    loginTextLink: {
      color: colors.primary,
      marginTop: moderateScale(30),
      textAlign: "center",
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={(text) => setState((prev) => ({ ...prev, name: text }))}
      />
      <Text style={styles.errorTextStyle}>{nameError}</Text>
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={(text) => setState((prev) => ({ ...prev, email: text }))}
        autoCapitalize="none"
      />
      <Text style={styles.errorTextStyle}>{emailError}</Text>
      <TextInput
        autoCapitalize="none"
        label="Password"
        mode="outlined"
        value={password}
        secureTextEntry
        onChangeText={(text) =>
          setState((prev) => ({ ...prev, password: text }))
        }
      />
      <Text style={styles.errorTextStyle}>{passwordError}</Text>
      <Button
        children="SignUp"
        loading={isLoading}
        mode="contained"
        style={styles.buttonStyle}
        labelStyle={styles.buttonLabelStyle}
        contentStyle={styles.buttonContentStyle}
        onPress={signupUser}
      />
      <Link href={"/auth/login"} style={styles.loginTextLink}>
        already has an account ? click here to login
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
export default SignUp;
