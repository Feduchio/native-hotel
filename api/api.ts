import axios from "axios";

export default {
  hotelList(location: string, checkIn: string, checkOut: string) {
    return axios.get(
      `https://engine.hotellook.com/api/v2/cache.json?currency=rub&limit=15&location=${location}&checkIn=${checkIn}&checkOut=${checkOut}`
    );
  },
};
