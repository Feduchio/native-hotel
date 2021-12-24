import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, DatePicker } from "antd";
import moment from "moment";

import { getHotelsList, searchFormSubmit } from "../../store/actions";

import "./SearchBlock.css";
import "antd/dist/antd.css";

export const SearchBlock = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Москва");
  const [days, setDays] = useState(1);

  const handleSearch = () => {
    const searchFormValue = {
      location: location,
      checkIn: date || moment().format("YYYY-MM-DD"),
      countOfDays: days,
    };
    dispatch(getHotelsList(searchFormValue));
    dispatch(searchFormSubmit(searchFormValue));
  };

  const locationChange = (e) => {
    const curr = e.target.value;
    setLocation(curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase());
  };

  const dateChange = (date, dateString) => {
    setDate(dateString);
  };

  const daysChange = (e) => {
    setDays(e.target.value);
  };

  return (
    <div className="search-block">
      <div className="search-block-container">
        <Form layout="vertical">
          <Form.Item name="location" label="Локация">
            <Input onChange={locationChange} />
          </Form.Item>

          <Form.Item label="Дата заселения">
            <DatePicker
              className="search-block-container-datepicker"
              onChange={dateChange}
              placeholder=""
            />
          </Form.Item>

          <Form.Item name="days" label="Количество дней">
            <Input onChange={daysChange} />
          </Form.Item>

          <button
            onClick={handleSearch}
            type="submit"
            className="search-block-button"
          >
            Найти
          </button>
        </Form>
      </div>
    </div>
  );
};
