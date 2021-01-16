import React from "react";
import WeatherCardContent from "./WeatherCardContent.js";

const WeatherCard = (props) => {
  const { weather, forecast } = props;

  return (
    <div>
      <WeatherCardContent weather={weather} forecast={forecast} />
    </div>
  );
};
export default WeatherCard;
