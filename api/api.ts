const hotelApi = "http://engine.hotellook.com/api/v2/cache.json";

export const api = {
  hotelList: async function (queryParams = {}) {
    const url = new URL(hotelApi);
    const requestQueryParams = { currency: "rub", limit: 10, ...queryParams };

    Object.entries(requestQueryParams).forEach(([paramKey, paramValue]) => {
      if (paramValue) {
        url.searchParams.append(paramKey, paramValue);
      }
    });

    const response = await fetch(url);

    const json = await response.json();

    return json;
  },
};
