import { useNavigate } from "react-router-dom";
import { Image } from "react-native";

import logoutImg from "../../assets/images/logoutImg.svg";

import "./SearchPage.css";

export const SearchPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate(`/`);
  };

  return (
    <div className="search-page">
      <header className="search-page-header">
        <h1 className="search-page-header-title"> Simple Hotel Check</h1>
        <label>
          <button onClick={logout} className="search-page-header-button">
            Выйти
          </button>
          <Image
            className="search-page-header-button-img"
            src={logoutImg}
            alt="logout"
          />
        </label>
      </header>
      <div className="search-page-body">
        <aside className="search-page-aside">
          {/* <SearchBlock /> */}
          {/* <FavoriteBlock /> */}
        </aside>
        {/* <HotelsBlock /> */}
      </div>
    </div>
  );
};
