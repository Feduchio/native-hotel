import React from "react";
import { View, StyleSheet } from "react-native";

import { LoginForm } from "../../components/LoginForm/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <View style={styles.loginPage} />
      <LoginForm />
    </>
  );
};


const styles = StyleSheet.create({
  loginPage:{
  position: 'absolute',
  width: '100%',
  height: '100%',
  // backgroundRepeat: 'no-repeat',
    // background-image: url("../../assets/images/background_img.svg");
  // filter: blur(10px);
}
})

//   return (
    // <form className="login-form" onSubmit={formSubmitHandle}>
    //   <h2 className="login-form-title">Simple Hotel Check</h2>
    //   <label className="login-form-label error " htmlFor="login">
    //     Логин
    //     <input
    //       className="login-form-input errorInput"
    //       type="email"
    //       name="login"
    //       value={login}
    //       onBlur={(e) => blurHandler(e)}
    //       onChange={loginHandler}
    //     />
    //     {loginDirty && loginError && (
    //       <div className="login-form-error">{loginError}</div>
    //     )}
    //   </label>
    //   <label className="login-form-label" htmlFor="password">
    //     Пароль
    //     <input
    //       className="login-form-input"
    //       type="password"
    //       name="password"
    //       value={password}
    //       onBlur={(e) => blurHandler(e)}
    //       onChange={passwordHandler}
    //     />
    //     {passwordDirty && passwordError && (
    //       <div className="login-form-error">{passwordError}</div>
    //     )}
    //   </label>
    //   <button disabled={!formValid} className="login-form-button">
    //     Войти
    //   </button>
    // </form>
//   );
// };
