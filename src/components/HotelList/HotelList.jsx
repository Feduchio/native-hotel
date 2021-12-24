import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";

import { getHotelsList } from "../../store/actions";
import { selectHotels, selectValueSearch } from "../../store/selectors";

import HotelCard from "../HotelCard/HotelCard";

import "./HotelList.css";

export default function HotelList() {
  const dispatch = useDispatch();
  const hotels = useSelector(selectHotels);
  const valueSearch = useSelector(selectValueSearch);

  useEffect(() => {
    dispatch(getHotelsList({}));
  }, [dispatch]);

  return (
    <div className="hotel-list">
      <Scrollbars>
        {hotels.map((item, index) => (
          <>
            <div className="hotel-list-block">
              <div className="hotels-card-body-icon-container">
                <div className="hotels-card-body-icon" />
              </div>
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
            </div>
            {hotels.length - 1 !== index && <div className="divider" />}
          </>
        ))}
      </Scrollbars>
    </div>
  );
}
