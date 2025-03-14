import { StyleSheet, View } from "react-native";
import useSignUp from "../../src/auth/hooks/useSignUp";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import moderateScale from "@/src/utils/responsiveScale";
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
      marginBottom: moderateScale(10),
    },
    loginTextLink: {
      color: colors.primary,
      marginTop: moderateScale(20),
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
      />
      <Text style={styles.errorTextStyle}>{emailError}</Text>
      <TextInput
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
        children="Login"
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
    </View>
  );
};
export default SignUp;
