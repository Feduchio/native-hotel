import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  DatePicker, List,  } from "@ant-design/react-native";
import { Calendar } from 'react-native-calendars';
import moment from "moment";

import { getHotelsList, searchFormSubmit } from "../../redux/ducks/searchingHotels";

import { TouchableOpacity, View , Text, StyleSheet, Keyboard, Alert, TextInput, ListViewBase, Modal, Pressable} from "react-native";
import { Formik } from "formik";

export const SearchBlock = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Москва");
  const [days, setDays] = useState(1);

  const handleSearch = () => {
    const searchFormValue = {
      location: location,
      checkIn: date || moment().format("YYYY-MM-DD"),
      countOfDays: days,
    };
    dispatch(getHotelsList(searchFormValue));
    dispatch(searchFormSubmit(searchFormValue));
  };

  const locationChange = (value: string) => {
    const curr = value;
    setLocation(curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase());
  };

  const dateChange = (date, dateString:string) => {
    setDate(dateString);
  };

  const daysChange = (value: string) => {
    let invert = parseInt(value)
    setDays(invert);
  };

  return (
    <TouchableOpacity
    // style={styles.loginForm}
    onPress={() => Keyboard.dismiss()}
    activeOpacity={1}
  >
    <Formik
      initialValues={{ location: location, days: days }}
      onSubmit={handleSearch}
    >
      {(formikProps) =>{

        const { handleSubmit, handleChange, values } = formikProps;
        const [modalVisible, setModalVisible] = useState(false);
        return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={values.location}
                onChangeText={locationChange}
                autoCapitalize="none"
                placeholder="Локация"
              />

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Calendar />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
            
  
            <TextInput
                          style={styles.input}
               value={values.days}
                onChangeText={daysChange}
               autoCapitalize="none"
               placeholder="Количество дней"
              />
  
            <TouchableOpacity
              onPress={handleSearch}
            >
              <Text > Найти </Text>
            </TouchableOpacity>

        </View>)
      }}    
</Formik>
</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input:{

    height: 30,
    marginVertical:20,

  },
  container:{
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

// .search-block {
//   display: flex;
//   width: 100%;
//   max-height: 362px;
//   margin: 20px;
// }

// .search-block-button {
//   position: static;
//   width: 100%;
//   height: 40px;
//   color: #fff;
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 20px;
//   background: linear-gradient(104.34deg, #41522e -15.34%, #be8022 145.95%);
//   border: none;
//   border-radius: 4px;
//   outline: none;
//   box-shadow: 0 0 2px rgba(0 0 0 15%);
// }

// .search-block-container {
//   width: 100%;
//   padding: 32px;
//   background-color: #fff;
//   border-radius: 8px;
// }

// .search-block-container-datepicker {
//   width: 100%;
// }
