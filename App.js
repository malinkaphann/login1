import * as React from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import validator from "validator";

const App = () => {
  const [emailErrorRequired, setEmailErrorRequired] = React.useState(false);
  const [emailErrorInvalid, setEmailErrorInvalid] = React.useState(false);
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = React.useState('');

  const [passwordErrorRequired, setPasswordErrorRequired] = React.useState(
    false
  );
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState('');
  const [passwordDirty, setPasswordDirty] = React.useState(false);

  const [passwordSeen, setPasswordSeen] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const [submitted, setSubmitted] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = React.useState(false);

  const validateEmail = (el) => {
    const value = el.nativeEvent.text;
    
    setEmailDirty(true);

    if (validator.isEmpty(value)) {
      setEmailErrorRequired(true);
      setEmailErrorMsg("email is required");
      return;
    }

    setEmailErrorRequired(false);
    setEmailErrorMsg("");

    if (!validator.isEmail(value)) {
      setEmailErrorInvalid(true);
      setEmailErrorMsg("email is invalid");
      return;
    }

    setEmailErrorInvalid(false);
    setEmailErrorMsg("");
  };

  const validatePassword = (el) => {
    const value = el.nativeEvent.text;

    setPasswordDirty(true);

    if (validator.isEmpty(value)) {
      setPasswordErrorRequired(true);
      setPasswordErrorMsg("password is required");
      return;
    }

    setPasswordErrorRequired(false);
    setPasswordErrorMsg("");
  };

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoginSuccess(false);
      setSubmitted(true);
    }, 2000);
  };

  const retry = () => {
    setSubmitted(false);
  };

  const headerSection = () => (
    <View style={styles.headerSection}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back-outline" size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Log in</Text>
    </View>
  );

  const socialSection = () => (
    <View style={styles.socialSection}>
      <Text style={styles.socialLabel}>Login with the following options</Text>
      <View style={styles.socialButtonSection}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const formSection = () => (
    <View style={styles.formSection}>
      <View style={styles.formItem}>
        <View style={styles.formLabelSection}>
          <Text style={styles.formLabel}>Email</Text>
          <Text style={styles.formLabelError}>{emailErrorMsg}</Text>
        </View>

        <TextInput
          style={[
            styles.formInput,
            emailErrorRequired || emailErrorInvalid
              ? styles.formInputError
              : '',
          ]}
          placeholder="email"
          onBlur={validateEmail}
          onChangeText={txt => setEmail(txt)}
        />
        {emailDirty && (
          <Ionicons
            style={styles.suffixIcon}
            name={
              emailErrorRequired || emailErrorInvalid ? "close" : "checkmark"
            }
            size={20}
            color="white"
          />
        )}
      </View>
      <View style={styles.formItem}>
        <View style={styles.formLabelSection}>
          <Text style={styles.formLabel}>Password</Text>
          <Text style={styles.formLabelError}>{passwordErrorMsg}</Text>
        </View>
        <TextInput
          style={styles.formInput}
          placeholder="password"
          onBlur={validatePassword}
          secureTextEntry={passwordSeen ? false : true}
          onChangeText={(txt) => setPassword(txt)}
        />
        {password !== "" && (
          <Ionicons
            style={styles.suffixIcon}
            name={passwordSeen ? "eye" : "eye-off"}
            size={20}
            color="white"
            onPress={() => setPasswordSeen(!passwordSeen)}
          />
        )}
      </View>
      <View style={styles.loginButtonSection}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={submit}
          disabled={
            !emailDirty ||
            !passwordDirty ||
            emailErrorRequired ||
            emailErrorInvalid ||
            passwordErrorRequired
          }
        >
          <Text style={styles.loginButtonLabel}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const suggestToSignupSection = () => (
    <View style={styles.suggestToSignupSection}>
      <Text style={styles.suggestLabel}>
        <Text>Don't have an account? </Text>
        <Text
          style={styles.suggestLabelBold}
          onPress={() => alert("go to sign up page")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );

  const loadingSection = () => (
    <View style={styles.loadingSection}>
      <ActivityIndicator color="white" />
    </View>
  );

  const loginStatusSection = () => (
    <View style={styles.loginStatusSection}>
      <Ionicons
        name={
          loginSuccess ? "checkmark-circle-outline" : "close-circle-outline"
        }
        size={64}
        color={loginSuccess ? "green" : "red"}
        onPress={retry}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && loadingSection()}
      {submitted && loginStatusSection()}
      <View
        style={[styles.contentSection, loading || submitted ? styles.blur : ""]}
      >
        {headerSection()}
        {socialSection()}
        {formSection()}
        {suggestToSignupSection()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "black",
  },
  loadingSection: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginStatusSection: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  blur: {
    opacity: 0.09,
  },
  contentSection: {
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "rgb(34, 34, 34)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginLeft: 17,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  socialSection: {
    marginTop: 70,
  },
  socialLabel: {
    color: "gray",
  },
  socialButtonSection: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    width: "47%",
    height: 40,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "rgb(34, 34, 34)",
    justifyContent: "center",
    alignItems: "center",
  },
  formSection: {
    marginTop: 40,
  },
  formItem: {
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
  },
  formLabelSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  formLabel: {
    color: "white",
  },
  formLabelError: {
    color: "red",
  },
  formInput: {
    color: "white",
    height: 50,
    borderWidth: 1,
    borderColor: "rgb(34, 34, 34)",
    borderRadius: 10,
    paddingLeft: 10,
  },
  formInputError: {
    borderColor: "rgb(212, 40, 167)",
  },
  suffixIcon: {
    position: "absolute",
    right: 10,
    top: 50,
  },
  loginButtonSection: {
    marginTop: 30,
  },
  loginButton: {
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(212, 40, 167)",
  },
  loginButtonLabel: {
    color: "white",
  },
  suggestToSignupSection: {
    marginTop: 40,
  },
  suggestLabel: {
    color: "gray",
    textAlign: "center",
  },
  suggestLabelBold: {
    fontWeight: "bold",
  },
});

export default App;
