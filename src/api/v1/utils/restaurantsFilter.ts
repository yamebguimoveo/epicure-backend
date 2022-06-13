import { DateTime } from "luxon";

export const openRestaurantsFilterFunc = (isOpen: any, restaurants: any) => {
  const { hour, minute } = DateTime.now();
  const filteredRestaurant = restaurants.filter((restaurant: any) => {
    const openTime = restaurant.openingHours.open;
    const openHour = openTime.substring(0, 2);
    const openMinute = openTime.substring(3, 5);
    const closeTime = restaurant.openingHours.close;
    const closeHour = closeTime.substring(0, 2);
    const closeMinute = closeTime.substring(3, 5);

    let flag: boolean = true;
    if (hour > parseInt(openHour)) {
    } else if (hour === parseInt(openHour) && minute > parseInt(openMinute)) {
    } else {
      flag = false;
    }
    if (hour < parseInt(closeHour)) {
    } else if (hour === parseInt(closeHour) && minute < parseInt(closeMinute)) {
    } else {
      flag = false;
    }

    if (flag === JSON.parse(isOpen)) {
      return restaurant._id;
    }
  });
  return filteredRestaurant;
};
