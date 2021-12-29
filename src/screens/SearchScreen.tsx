import { Image, View, Text, StyleSheet } from "react-native";

// import logoutImg from "../../assets/images/logoutImg.svg";


export const SearchScreen = () => {

  return (
    <View style={styles.searchScreen}>
      <Text >atlishna</Text>
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

