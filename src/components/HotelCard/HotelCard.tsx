import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, StyleSheet, TouchableOpacity, Modal, Button, Image } from "react-native";

import { correctNumeral } from "../CorrectNumber/CorrectNumber";
import {
  addFavoriteHotel, selectFavorites,
} from "../../redux/ducks/searchingHotels";
import { AddFavoriteHotelActionPayload } from "../../redux/ducks/searchingHotelsTypes";

export default function HotelCard({
  id,
  name,
  checkIn,
  countOfDays,
  stars,
  priceAvg,
  favButtonTitle
}: {id: number, name: string, checkIn: string, countOfDays: number, stars: number, priceAvg: number, favButtonTitle:string}) {

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  
  const [ isFav ] = useSelector(selectFavorites)
  const favoriteClick = (e: AddFavoriteHotelActionPayload) => {
    dispatch(addFavoriteHotel(e));
    console.log(isFav?.id)
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() =>
        favoriteClick({
          id,
          name,
          checkIn,
          countOfDays,
          stars,
          priceAvg,
        })
      }
      onPress={() =>
        setModalVisible(true)
      }
      onPressOut={() => {setModalVisible(false)}}
     >
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View>
            <Text style={styles.date}>
              {checkIn} - {countOfDays}{" "}
              {correctNumeral(countOfDays, {
                one: "день",
                two: "дня",
                plural: "дней",
              })}
            </Text>
          </View>
        </View>
        {(isFav?.id === id) ? <Image 
              source={require('../../../assets/Icons/heart.png')} 
              style={styles.like}
            /> : <></>}
        <View style={styles.price}>
          <View>
            <Rating
              ratingCount={5}
              readonly={true}
              startingValue={stars}
              imageSize={15}
            />
          </View>
          <Text>
            Price: {priceAvg.toFixed()}
          </Text>
        </View>
          <Modal
          animationType={"fade"}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {setModalVisible(false)}}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text style={styles.modalName}>{name}</Text>
                </View>
              <View>
              <Text style={styles.date}>
                {checkIn}, {countOfDays}{" "}
                {correctNumeral(countOfDays, {
                one: "день",
                two: "дня",
                plural: "дней",
                })}
              </Text>
              </View>
              <Text style={styles.modalStars}>
              <Rating
                ratingCount={5}
                readonly={true}
                startingValue={stars}
                imageSize={15}
              />           Price: {priceAvg.toFixed()}
              </Text>
              <View style={styles.modalButtons}>
                <Button 
                  title={"Close"} 
                  onPress={() => setModalVisible(!modalVisible)}/>
                <Button 
                  title={favButtonTitle} 
                  onPress={() => favoriteClick({
                    id,
                    name,
                    checkIn,
                    countOfDays,
                    stars,
                    priceAvg,
                  })}/>
              </View>
              </View>
            </View>
          </Modal>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalStars: {
    marginTop:10
  },
  modalButtons: {
    flexDirection: 'row',
  },
  like: {
    width: 25, 
    height: 25, 
  },
  modalView: {
    width: "80%",
    height: '23%',
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
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 380,
    height: 60,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 4,
    opacity: 0.95,
  },
  card: {
    marginHorizontal: 14,
    maxWidth: "60%",
    maxHeight: "100%",
  },
  price: {
    marginHorizontal: 14,
    alignItems: "flex-end",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalName: {
    width: 300,
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  date: {
    fontWeight: "300",
  },
});