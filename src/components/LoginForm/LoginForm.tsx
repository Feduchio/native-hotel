import React, { useState, useCallback, useEffect, useRef } from "react";

import { Formik } from "formik";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";


export const LoginForm = () => {
const loginRef = useRef(null)
const passwordRef = useRef(null)
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [login, setLogin] = useState("");
const [password, setPassword] = useState("");
const [loginError, setLoginError] = useState("Логин не может быть пустым");
const [passwordError, setPasswordError] = useState(
  "Пароль не может быть пустым"
);
const [formValid, setFormValid] = useState(false);

  useEffect(() => {
  if (loginError || passwordError) {
    setFormValid(false);
  } else {
    setFormValid(true);
  }
}, [loginError, passwordError]);

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

const blurHandler = (name: NativeSyntheticEvent<TextInputFocusEventData>) => {
  switch (name) {
    case loginRef:
      setLoginDirty(true);
      break;
    case passwordRef:
      setPasswordDirty(true);
      break;
    default:
      break;
  }
};

const formSubmitHandle = useCallback(
  (e) => {
    e.preventDefault();
    localStorage.setItem("user", login);
  },
  [login]
);

  return (
    <Formik initialValues={{login: login, password: password}} onSubmit={formSubmitHandle}>
      
      <TouchableWithoutFeedback
      style={styles.loginForm}
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      >
      <View>
    
      
      <View style={styles.loginFormTitle}><Text>Simple Hotel Check</Text></View>
      <View  >
        <Text style={styles.loginFormLabel}>Логин</Text>
        
        <TextInput
          style={styles.loginFormInput}
          // type="email"
          ref={loginRef}
          value={login}
          onChangeText={text => loginHandler(text)}
          onBlur={ref => console.log(ref)}
        />
        <Text>
        {loginDirty && loginError && (
          <Text >{loginError}</Text>
        )}</Text>
      </View>
      <View  >
        <Text style={styles.loginFormLabel}>Пароль</Text>
        <TextInput
          style={styles.loginFormInput}
          // type="password"
          ref={passwordRef}
          value={password}
          onChangeText={text => passwordHandler(text)}
          onBlur={passwordRef => blurHandler(passwordRef)}
        />
        <Text>
        {passwordDirty && passwordError && (
          <Text >{passwordError}</Text>
        )}</Text>
      </View>
      <TouchableOpacity disabled={!formValid} style={styles.loginFormButton}>
        <Text> Войти </Text>
      </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
      
    </Formik>
  );
};





const styles = StyleSheet.create({
  loginForm:{
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '409px',
    // height: '382px',
    padding: 32,
    fontWeight: '300',
    backgroundColor: '#fff',
    // borderRadius: '16px',
    // boxShadow: 0 4px 33px rgba(0 0 0 4%),
    // top: calc(50% - 382px / 2);
    // left: calc(50% - 409px / 2 - 0.5px);
  },
  loginFormTitle: {
    marginBottom: 30,
    color: '#424242',
    // -webkit-text-stroke: 1px solid #000;
    fontWeight: '500',
    fontSize: 24,
    // fontFamily: 'Roboto, sans-serif',
    fontStyle: 'normal',
    lineHeight: 28,
    textAlign: 'center',
  },
  loginFormLabel: {
    position: 'relative',
    color: '#424242',
    fontWeight: '300',
    fontSize: 16,
    // fontFamily: 'Roboto, sans-serif',
    lineHeight: 19,
  },

loginFormInput: {
  width: 345,
  height: 50,
  marginBottom: 24,
  padding: 16,
  fontSize: 20,
  borderWidth: 1,
  borderRadius: 4,
},
loginFormButton: {
  width: 345,
  height: 50,
  color: '#fff',
  fontWeight: '500',
  fontSize: 16,
  lineHeight: 20,
  // background: linear-gradient(104.34deg, #41522e -15.34%, #be8022 145.95%);
  borderRadius: 8,
  // boxShadow: '0 0 2px rgba(0 0 0 15%)',
},
})