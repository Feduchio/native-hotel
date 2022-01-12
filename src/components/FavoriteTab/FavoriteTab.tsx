import { useSelector } from "react-redux";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { selectFavorites } from "../../redux/ducks/searchingHotels";
import HotelCard from "../HotelCard/HotelCard";
import moment from "moment";
import { FavoriteCounter } from "../FavoriteCounter/FavoriteCounter";

const image = { uri: "https://images.unsplash.com/photo-1589876876491-df78ff60e196?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" };

const FILTERS = { STARS: "stars", PRICE: "priceAvg" };

export const FavoriteTab = () => {
  const favorites = useSelector(selectFavorites);
  
  // const [sort, setSort] = useState({ name: "", direction: "" });

  // const handleFilterClick = (filter) => {
  //   if (sort.direction === "ascend") {
  //     setSort({ name: filter, direction: "descend" });
  //   } else {
  //     setSort({ name: filter, direction: "ascend" });
  //   }
  // };

  // const sortedHotels = sort.name
  //   ? favorites.sort((a, b) => {
  //       const sortKey = sort.name;
  //       if (sort.direction === "ascend") {
  //         return a[sortKey] - b[sortKey];
  //       }
  //       if (sort.direction === "descend") {
  //         return b[sortKey] - a[sortKey];
  //       } else {
  //         return 0;
  //       }
  //     })
  //   : favorites;

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image} blurRadius={3}>
      <FavoriteCounter />
    <View style={{alignItems: 'center'}}> 
      {favorites?.map((item: {id: number, name: string, countOfDays: number, checkIn: string , stars: number, priceAvg: number}) => (
        <HotelCard
        key={item.id}
        id={item.id}
        checkIn={
          moment(item.checkIn)
            .locale("en-ca")
            .format("YYYY, DD MMMM") ||
          moment().locale("en-ca").format("YYYY, DD MMMM")
        }
        countOfDays={item.countOfDays || "1"}
        name={item.name}
        stars={item.stars}
        priceAvg={item.priceAvg}
      />
      ))}
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  image: {
    justifyContent: "flex-start",
    height: '100%',
    width: '100%'
  },
})
    // <div className="favorite-block">
    //   <div className="favorite-block-container">
    //     <h2 className="favorite-block-container-title">Избранное</h2>
    //     <button
    //       className="favorite-block-container-button"
    //       onClick={() => handleFilterClick(FILTERS.STARS)}
    //     >
    //       Рейтинг
    //     </button>
    //     <button
    //       className="favorite-block-container-button"
    //       onClick={() => handleFilterClick(FILTERS.PRICE)}
    //     >
    //       Цена
    //     </button>
    //     <Scrollbars>
    //       {sortedHotels.map((favorites, index) => (
    //         <>
    //           <HotelCard
    //             checkIn={favorites.checkIn}
    //             countOfDays={favorites.countOfDays}
    //             key={favorites.id}
    //             id={favorites.id}
    //             name={favorites.name}
    //             stars={favorites.stars}
    //             priceAvg={favorites.priceAvg}
    //           />
    //           {sortedHotels.length - 1 !== index && <div className="divider" />}
    //         </>
    //       ))}
    //     </Scrollbars>
    //   </div>
    // </div>


// .favorite-block {
//   display: flex;
//   width: 100%;
//   height: 100%;
//   margin: 20px;
// }

// .favorite-block-container {
//   width: 100%;
//   height: 40vh;
//   padding: 32px;
//   background-color: #fff;
//   border-radius: 8px;
// }

// .favorite-block-container-button {
//   box-sizing: border-box;
//   margin-right: 15px;
//   padding: 4px 8px;
//   color: #41522e;
//   background: #fff;
//   border: 1px solid #41522e;
//   border-radius: 4px;
//   cursor: pointer;
// }
