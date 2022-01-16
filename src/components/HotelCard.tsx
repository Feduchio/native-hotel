import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { correctNumeral } from "./CorrectNumber";
import {
  addFavoriteHotel,
  selectFavorites,
} from "../redux/ducks/searchingHotels";
import { AddFavoriteHotelActionPayload } from "../redux/ducks/searchingHotelsTypes";

export default function HotelCard({
  id,
  name,
  checkIn,
  countOfDays,
  stars,
  priceAvg,
  favButtonTitle,
  navigation,
}: {
  id: number;
  name: string;
  checkIn: string;
  countOfDays: number;
  stars: number;
  priceAvg: number;
  favButtonTitle: string;
}) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const isFav = useSelector(selectFavorites);
  const likes = isFav.map((element: { id: number }) => element.id);
  const favoriteClick = (e: AddFavoriteHotelActionPayload) => {
    dispatch(addFavoriteHotel(e));
  };

  return (
    <View style={styles.globalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        onLongPress={() =>
          navigation.navigate("HotelScreen", {
            name,
            checkIn,
            countOfDays,
            stars,
            priceAvg,
          })
        }
        onPressOut={() => {
          setModalVisible(false);
        }}
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
          <View style={styles.info}>
            <View style={styles.price}>
              <View>
                <Rating
                  ratingCount={5}
                  readonly={true}
                  startingValue={stars}
                  imageSize={15}
                />
              </View>
              <Text>Price: {priceAvg.toFixed()}</Text>
            </View>
          </View>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
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
                </View>
                <View>
                  <Rating
                    ratingCount={5}
                    readonly={true}
                    startingValue={stars}
                    imageSize={45}
                  />
                  <Text style={styles.modalStars}>
                    Price: {priceAvg.toFixed()}
                  </Text>
                  <View style={styles.modalButtons}>
                    <Button
                      title={"Close"}
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                    <Button
                      title={favButtonTitle}
                      onPress={() =>
                        favoriteClick({
                          id,
                          name,
                          checkIn,
                          countOfDays,
                          stars,
                          priceAvg,
                        })
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
      <View style={styles.likeContainer}>
        {likes.includes(id) ? (
          <FontAwesome.Button
            onPress={() =>
              favoriteClick({
                id,
                name,
                checkIn,
                countOfDays,
                stars,
                priceAvg,
              })
            }
            activeOpacity={0.8}
            style={styles.like}
            name="heart"
            size={30}
            color="red"
            backgroundColor={"white"}
          />
        ) : (
          <TouchableOpacity>
            <FontAwesome.Button
              onPress={() =>
                favoriteClick({
                  id,
                  name,
                  checkIn,
                  countOfDays,
                  stars,
                  priceAvg,
                })
              }
              style={styles.like}
              name="heart-o"
              size={30}
              color="black"
              backgroundColor={"white"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  globalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalStars: {
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "center",
    marginTop: "10%",
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  modalHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  likeContainer: {
    margin: "1%",
  },
  like: {
    paddingLeft: 15,
    paddingVertical: 15,
    // borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    height: "40%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "space-between",
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
    width: 310,
    height: 110,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 4,
    opacity: 0.95,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    marginHorizontal: 14,
    maxWidth: "60%",
    height: "65%",
    justifyContent: "space-between",
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
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  date: {
    fontWeight: "300",
  },
});
