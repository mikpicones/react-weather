import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import WeatherForecast from "./WeatherForecast.js";
import Divider from "@material-ui/core/Divider";
import { Box } from "@material-ui/core";
import stratus from "./assets/stratus.png";
import sun from "./assets/sun.png";
import cloudy from "./assets/cloudy.png";
import stratuscumulus from "./assets/stratuscumulus.png";
import cumulus from "./assets/cumulus.png";
import rain from "./assets/rain.png";
import showerRain from "./assets/shower-rain.png";
import snow from "./assets/snow.png";
import thunder from "./assets/thunder.png";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  icon: {
    width: 130,
    height: 130,
    margin: "auto",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  details: {
    marginLeft: 40,
    alignSelf: "center",
    width: 450,
  },
  details2: {
    textAlign: "right",
    margin: "auto",
    position: "relative",
    width: 200,
  },
});

export const getWeatherIcon = (description) => {
  let weatherIcon = "";
  switch (description) {
    case "scattered clouds":
      weatherIcon = stratus;
      break;
    case "clear sky":
      weatherIcon = sun;
      break;
    case "few clouds":
      weatherIcon = cloudy;
      break;
    case "broken clouds":
      weatherIcon = stratuscumulus;
      break;
    case "overcast clouds":
      weatherIcon = cumulus;
      break;
    case "shower rain":
      weatherIcon = showerRain;
      break;
    case "light rain":
      weatherIcon = rain;
      break;
    case "thunderstorm":
      weatherIcon = thunder;
      break;
    case "snow":
      weatherIcon = snow;
      break;
    default:
      break;
  }
  return weatherIcon;
};

const WeatherCardContent = (props) => {
  const classes = useStyles();
  const { weather, forecast } = props;

  return (
    <Card elevation={0} boxShadow={0}>
      <Box className={classes.header}>
        <CardContent className={classes.root}>
          <CardMedia
            className={classes.icon}
            image={getWeatherIcon(weather.description)}
            width="500px"
          />
          <Box className={classes.details}>
            <Typography variant="h2">
              {Math.round(weather.temperature)}°C
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {weather.city}, {weather.country}
            </Typography>
          </Box>
          <Box className={classes.details2}>
            <Typography variant="subtitle1">
              Min: {Math.round(weather.min)}°C
            </Typography>
            <Typography variant="subtitle1">
              Max: {Math.round(weather.max)}°C
            </Typography>
            <Typography variant="subtitle1">
              Wind Speed: {Math.round(weather.wind_speed)} km/h
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <WeatherForecast forecast={forecast} />
        </Box>
        <Divider orientation="vertical" flexItem />
      </CardContent>
    </Card>
  );
};

export default WeatherCardContent;
