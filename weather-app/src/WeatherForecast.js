import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import { getWeatherIcon } from "./WeatherCardContent";
import { CardMedia } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  title: {
    fontSize: 18,
  },
  pos: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 100,
    height: 100,
    alignItems: "center",
  },
  desc: {
    fontSize: 10,
  },
});

export default function WeatherForecast(props) {
  const classes = useStyles();
  const { forecast } = props;

  const formatDayCards = () => {
    return forecast.map((reading, index) => (
      <Grid
        item
        key={index}
        xs={12}
        sm={12}
        md={12}
        lg={2}
        className={classes.pos}
      >
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {dayjs(reading.dt_txt).format("dddd")}
        </Typography>
        <CardMedia
          className={classes.icon}
          image={getWeatherIcon(reading.description)}
        />
        <Typography variant="h4" component="h2">
          {Math.round(reading.temperature)}°C
        </Typography>
        <Typography className={classes.desc} variant="caption" display="block">
          {reading.description}
        </Typography>
        <Typography variant="caption" display="block">
          Min: {Math.round(reading.min)}°C
          <br /> Max: {Math.round(reading.max)}°C
        </Typography>
      </Grid>
    ));
  };

  return formatDayCards();
}
