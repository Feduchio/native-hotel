import axios from 'axios';

const hotelApi = "https://engine.hotellook.com/api/v2/cache.json?currency=rub&limit=10";

export default {
  hotelList(location: string, checkIn: string, checkOut: string){
    return axios.get(`${hotelApi}&location=${location}&checkIn=${checkIn}&checkOut=${checkOut}`)
  }
}
