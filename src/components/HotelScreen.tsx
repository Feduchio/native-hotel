import React from "react";
import { View, Text, StyleSheet,} from "react-native";
import { Rating } from "react-native-ratings";

import { correctNumeral } from "./CorrectNumber/CorrectNumber";

export const HotelScreen = ( {name, checkIn, countOfDays, stars, priceAvg}: {id: number, name: string, checkIn: string, countOfDays: number, stars: number, priceAvg: number, favButtonTitle:string}) => {
return (
    <View style={styles.container}>
        <View style={styles.card}>
          <View >
            <Text
            style={styles.name}>{name}</Text>
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
          <Text>
            Price: {priceAvg.toFixed()}
          </Text>
        </View>
        </View>
        </View>
)
}

const styles = StyleSheet.create({
    
})

