import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";

import { setUser } from "../redux/ducks/searchingHotels";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("Логин не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);

  const passMark = "password";
  const logMark = "login";

  const formSubmitHandle = () => {
    dispatch(setUser(login));
    console.log("asdfas");
  };

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      activeOpacity={1}
      style={styles.loginForm}
    >
      <Formik
        initialValues={{ login: login, password: password }}
        onSubmit={formSubmitHandle}
      >
        {(formikProps) => {
          const { handleSubmit, handleChange, values } = formikProps;

          const loginHandler = (value: string) => {
            setLogin(value);
            const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!re.test(String(value).toLowerCase())) {
              setLoginError("Некорректный логин");
              return;
            }
            if (!value) {
              setLoginError("Логин не может быть пустым");
            } else {
              setLoginError("");
            }
          };

          const passwordHandler = (value: string) => {
            setPassword(value);
            const re = /[a-zA-Z0-9]+/;
            if (value.length < 8 || !re.test(String(value))) {
              setPasswordError("Некорректный пароль");
              return;
            }
            if (!value) {
              setPasswordError("Пароль не может быть пустым");
            } else {
              setPasswordError("");
            }
          };

          const blurHandler = (name: string) => {
            switch (name) {
              case "login":
                setLoginDirty(true);
                break;
              case "password":
                setPasswordDirty(true);
                break;
              default:
                break;
            }
          };

          useEffect(() => {
            if (loginError || passwordError) {
              setFormValid(false);
            } else {
              setFormValid(true);
            }
          }, [loginError, passwordError]);

          const onChange = (value: string, type: string) => {
            handleChange(type)(value);
            if (type === "login") {
              loginHandler(value);
            } else passwordHandler(value);
          };

          return (
            <View style={styles.container}>
              <Text style={styles.loginFormTitle}> Simple Hotel </Text>

              <Text style={styles.loginFormLabel}> Логин </Text>
              <TextInput
                style={styles.loginFormInput}
                value={values.login}
                onChangeText={(value) => onChange(value, "login")}
                onBlur={() => blurHandler(logMark)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text>
                {loginDirty && loginError && (
                  <Text style={styles.error}> {loginError} </Text>
                )}
              </Text>

              <Text style={styles.loginFormLabel}> Пароль </Text>
              <TextInput
                style={styles.loginFormInput}
                secureTextEntry={true}
                value={values.password}
                onChangeText={(value) => onChange(value, "password")}
                onBlur={() => blurHandler(passMark)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text>
                {passwordDirty && passwordError && (
                  <Text style={styles.error}> {passwordError} </Text>
                )}
              </Text>

              <TouchableOpacity
                disabled={!formValid}
                style={{ opacity: !formValid ? 0.5 : 1 }}
                onPress={() => handleSubmit}
              >
                <Text style={styles.loginFormButton}> Войти </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginForm: {
    padding: 20,
    fontWeight: "300",
    backgroundColor: "white",
    borderRadius: 30,
    margin: 12,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  loginFormTitle: {
    marginVertical: 30,
    color: "#424242",
    fontWeight: "500",
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 28,
    textAlign: "center",
  },

  loginFormLabel: {
    position: "relative",
    color: "#424242",
    fontWeight: "300",
    fontSize: 16,
    lineHeight: 19,
  },
  container: {
    // backgroundColor:'red'
  },

  loginFormInput: {
    width: "100%",
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 20,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 4,
  },

  loginFormButton: {
    marginVertical: 10,
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
  },

  error: {
    justifyContent: "center",
    textAlign: "center",
    color: "red",
    marginBottom: 5,
  },
});
