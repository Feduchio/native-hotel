import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Calendar } from "react-native-calendars";
import moment from "moment";

import {
  getHotelsList,
  searchFormSubmit,
} from "../../redux/ducks/searchingHotels";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Keyboard,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { Formik } from "formik";

export const SearchBlock = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Москва");
  const [days, setDays] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    const searchFormValue = {
      location: location,
      checkIn: date || moment().format("YYYY-MM-DD"),
      countOfDays: days,
    };
    console.log(searchFormValue);

    dispatch(getHotelsList(searchFormValue));
    dispatch(searchFormSubmit(searchFormValue));
  };

  return (
    <TouchableOpacity
      // style={styles.loginForm}
      onPress={() => Keyboard.dismiss()}
      activeOpacity={1}
    >
      <Formik
        initialValues={{ location: "", days: "" }}
        onSubmit={handleSearch}
      >
        {(formikProps) => {
          const { handleChange, values } = formikProps;

          const locationChange = (value: string) => {
            const curr = value;
            setLocation(
              curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase()
            );
          };

          const dateChange = (dateString: string) => {
            setDate(dateString);
          };

          const daysChange = (value: string) => {
            let invert = parseInt(value);
            setDays(invert);
          };

          const onChange = (value: string, type: string) => {
            handleChange(type)(value);
            if (type === "location") {
              locationChange(value);
            } else if (type === "days") {
              daysChange(value);
            } else {
              dateChange(value);
              setModalVisible(!modalVisible);
            }
          };

          return (
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                value={values.location}
                onChangeText={(value) => onChange(value, "location")}
                autoCapitalize="none"
                placeholder="Location"
              />

              <TextInput
                style={styles.input}
                value={values.days}
                keyboardType="number-pad"
                onChangeText={(value) => onChange(value, "days")}
                autoCapitalize="none"
                placeholder="Days"
              />

              <Modal
                animationType={"fade"}
                transparent={true}
                visible={modalVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Calendar
                      minDate={moment().format("YYYY-MM-DD")}
                      onDayPress={(day) => {
                        onChange(day.dateString, "date");
                      }}
                    />
                  </View>
                </View>
              </Modal>

              <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.date}
              >
                <Text>{!date ? "Date" : moment(date).format("MMMM DD")}</Text>
              </Pressable>

              <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text>Search</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 100,
    margin: 10,
    borderBottomWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#999",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

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
