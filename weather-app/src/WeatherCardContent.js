import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import WeatherForecast from "./WeatherForecast.js";
import Grid from "@material-ui/core/Grid";
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
import moderateRain from "./assets/moderaterain.png";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  error: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 160,
    height: 160,
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: 200,
      height: 200,
    },
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  details: {
    margin: "auto",
    width: "auto",
    textAlign: "center",
    [theme.breakpoints.only("lg")]: {
      textAlign: "left",
    },
    [theme.breakpoints.down("md")]: {
      textAlign: "left",
    },
  },
  details2: {
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "right",
      paddingRight: "50px",
    },
    margin: "auto",
    width: "auto",
    paddingTop: "30px",
  },
}));

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
    case "moderate rain":
      weatherIcon = moderateRain;
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
    <Box>
      {typeof weather.main != "undefined" ? (
        <Card elevation={0} boxShadow={0}>
          <Box>
            <CardContent className={classes.root} elevation={0}>
              <Grid container spacing={4} justify="center">
                <Grid lg={4}>
                  <CardMedia
                    className={classes.icon}
                    image={getWeatherIcon(weather.description)}
                    width="500px"
                  />
                </Grid>
                <Grid item lg={4}>
                  <Box className={classes.details}>
                    <Typography variant="h2">
                      {Math.round(weather.temperature)}°C
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {weather.city}, {weather.country}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={4}>
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
                </Grid>
              </Grid>
            </CardContent>
          </Box>
          <CardContent>
            <Grid container spacing={10}>
              <Grid item xs={1} sm={1} md={1}></Grid>
              <WeatherForecast forecast={forecast} />
              <Grid xs={1} sm={1} md={1}></Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Box component="div" className={classes.error}>
          <Typography variant="body1" gutterBottom align="center">
            No city found! Please ensure that the value entered is valid.
            <br />
            <br />
            <Typography variant="body2" gutterBottom>
              <Button variant="contained" color="primary" onClick={refreshPage}>
                Back
              </Button>
            </Typography>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WeatherCardContent;

function refreshPage() {
  window.location.reload(false);
}
