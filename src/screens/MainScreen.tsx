import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  selectUserLogin,
  selectHotels,
  selectValueSearch,
  getHotelsList,
} from "../redux/ducks/searchingHotels";

import { FavoriteBlock } from "../components/FavoriteBlock/FavoriteBlock";
import { SearchBlock } from "../components/SearchBlock/SearchBlock";
import { HotelsBlock } from "../components/HotelsBlock/HotelsBlock";
import HotelCard from "../components/HotelCard/HotelCard";
import moment from "moment";
import { useEffect } from "react";

export const MainScreen = () => {
  const dispatch = useDispatch();
  const getLogin = useSelector(selectUserLogin);

  const unlog = () => {
    // dispatch(setUser(""));
    console.log(hotels);
  };

  const hotels = useSelector(selectHotels);
  const valueSearch = useSelector(selectValueSearch);

  useEffect(() => {
    dispatch(
      getHotelsList({
        location: "moscow",
        checkIn: moment().format("YYYY-MM-DD"),
        countOfDays: 1,
      })
    );
  }, [dispatch]);

  return (
    <View style={styles.searchScreen}>
      <SearchBlock />
      <View style={styles.card}>
        {/* {hotels.map((item) => (
        <HotelCard
          key={item.hotelId}
          id={item.hotelId}
          checkIn={
            moment(valueSearch?.checkIn)
              .locale("en-ca")
              .format("DD MMMM, YYYY") ||
            moment().locale("en-ca").format("DD MMMM, YYYY")
          }
          countOfDays={valueSearch?.countOfDays || " 1 "}
          name={item.hotelName}
          stars={item.stars}
          priceAvg={item.priceAvg}
        />
        ))} */}
      </View>
      {/* <HotelsBlock /> */}
      <Button title="unlog" onPress={unlog} />
    </View>

    // <div className="search-page">
    //   <header className="search-page-header">
    //     <h1 className="search-page-header-title"> Simple Hotel Check</h1>
    //     <label>
    //       <button onClick={logout} className="search-page-header-button">
    //         Выйти
    //       </button>
    //       <Image
    //         // className="search-page-header-button-img"
    //         // src={logoutImg}
    //       />
    //     </label>
    //   </header>
    //   <div className="search-page-body">
    //     <aside className="search-page-aside">
    //       {/* <SearchBlock /> */}
    //       {/* <FavoriteBlock /> */}
    //     </aside>
    //     {/* <HotelsBlock /> */}
    //   </div>
    // </div>
  );
};

const styles = StyleSheet.create({
  searchScreen: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "red",
    width: 30,
    height: 100,
    flex: 1,
  },
});

// .search-page {
//   position: fixed;
//   top: 0;
//   left: 0;
//   box-sizing: border-box;
//   width: 100%;
//   height: 100%;
//   padding: 35px;
//   background: #e5e5e5;
// }

// .search-page-header {
//   display: flex;
//   justify-content: space-between;
// }

// .search-page-header-title {
//   margin: 0 0 32px;
// }

// .search-page-header-button {
//   margin: 10px 0;
//   overflow: hidden;
//   color: #41522e;
//   font-weight: 400;
//   font-size: 16px;
//   background-color: transparent;
//   border: none;
//   outline: none;
//   cursor: pointer;
// }

// .search-page-header-button-img {
//   padding-left: 10px;
//   cursor: pointer;
// }

// .search-page-body {
//   display: flex;
//   gap: 24px;
//   justify-content: center;
//   width: 100%;
// }

// .search-page-aside {
//   width: 360px;
// }
