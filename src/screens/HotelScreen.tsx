import React from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";

import { addFavoriteHotel, image, selectFavorites } from "../redux/ducks/searchingHotels";
import { AddFavoriteHotelActionPayload } from "../redux/ducks/searchingHotelsTypes";
import { correctNumeral } from "../components/CorrectNumber";

export const HotelScreen = (props: { route: { params: {id: number, checkIn: string, countOfDays: number, name: string, priceAvg: number, stars: number } }, navigation: any }) => {

  const dispatch = useDispatch();
  const params = props.route.params

  const favoriteClick = (e: AddFavoriteHotelActionPayload) => {
    dispatch(addFavoriteHotel(e));
  };
  
  const isFav = useSelector(selectFavorites);
  const likes = isFav.map((element: { id: number }) => element.id);

  return (
    <ImageBackground
    source={image}
    resizeMode="cover"
    style={styles.image}
    blurRadius={3}
  >
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.name}>{params.name}</Text>
        </View>
        <View>
          <Text style={styles.date}>
            {params.checkIn} - {params.countOfDays}{" "}
            {correctNumeral(params.countOfDays, {
              one: "день",
              two: "дня",
              plural: "дней",
            })}
          </Text>
        </View>
      </View>
      <View >
        <Rating
        ratingCount={5}
        readonly={true}
        startingValue={params.stars}
        imageSize={40}
      />

          <Text style={styles.price}>Price: {params.priceAvg.toFixed()}</Text>
        <View style={styles.buttonsContainer}>
          <Button title='Back' onPress={() => props.navigation.navigate('SearchScreen')}/>
          <Button
            title={likes.includes(params.id) ? 'Remove from fav' : 'Add to fav'}
            onPress={() => 
              favoriteClick({
                id: params.id, 
                name: params.name,
                checkIn: params.checkIn,
                countOfDays: params.countOfDays,
                stars: params.stars,
                priceAvg: params.priceAvg,
              })
            }
          />
        </View>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    image: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    padding: '10%',
    backgroundColor: 'white',
    width: '90%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    opacity: 0.9
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    textAlign: "center",
    marginBottom:'10%'
  },
  card: {
    marginHorizontal: 14,
    maxWidth: "60%",
    height: "65%",
    justifyContent: "space-between",
  },     
  price: {
    marginHorizontal: 14,
    fontSize: 20,
    textAlign: "center",
    marginTop: '10%'
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 5,
  },
});

function dispatch(arg0: { type: "searchingHotels/ADD_FAVORITE_HOTEL_ACTION"; payload: AddFavoriteHotelActionPayload; }) {
  throw new Error("Function not implemented.");
}

