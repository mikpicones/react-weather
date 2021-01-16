import React, { useState, useEffect } from "react";
import "./App.css";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  fade,
} from "@material-ui/core/styles";
import { Box, Paper, Fade } from "@material-ui/core";
import WeatherCard from "./WeatherCard.js";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";

import InputBase from "@material-ui/core/InputBase";
import weatherIcon from "./assets/rain-cloud-weather.gif";

const api = {
  key: "f42c45452f08a3f0bd20834e488686f9",
  base: "https://api.openweathermap.org/data/2.5/",
};

const useStyles = makeStyles((theme) => ({
  bgImage: {
    position: "relative",
  },
  card: {
    width: 900,
  },
  container: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "auto",
  },
  btnToggle: {
    float: "right",
  },
  menu: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
    alignSelf: "center",
    paddingLeft: 10,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginBottom: 10,
    width: 500,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: 500,
  },
}));

const App = () => {
  const classes = useStyles();
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showWeatherCard, setShowWeatherCard] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [fade, setFade] = useState(false);
  const [back, setBack] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: `"Montserrat", sans-serif`,
    },
    overrides: {
      MuiCard: {
        boxShadow: 0,
      },
    },
  });

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    getWeather(query)
      .then((weather) => {
        setWeather(weather);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });

    getForecast(query)
      .then((forecast) => {
        setForecast(forecast);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const duration = {
    enter: 1500,
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <AppBar position="static" color="transparent" elevation={0}>
          <Box className={classes.menu}>
            <Typography variant="h6" className={classes.title}>
              {back ? (
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={refreshPage}
                >
                  <ArrowBackIcon fontSize="large" />
                </IconButton>
              ) : (
                ""
              )}
            </Typography>
            <Toolbar>
              <Switch
                className={classes.btnToggle}
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="primary"
              />
            </Toolbar>
          </Box>
        </AppBar>
        <Box className={classes.container}>
          <Box className={classes.item}>
            {showSearch ? (
              <Box component="div" className={classes.search}>
                {/* <Avatar
                  variant="square"
                  className={classes.square}
                  src={weatherIcon}
                /> */}
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  value={query}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setFade(true);
                      setShowWeatherCard(true);
                      setShowSearch(false);
                      setBack(true);
                      search();
                    }
                  }}
                />
              </Box>
            ) : null}
            {showWeatherCard ? (
              <Fade in={fade} timeout={duration}>
                <Paper elevation={0}>
                  <Box component="div" className={classes.card}>
                    <WeatherCard weather={weather} forecast={forecast} />
                  </Box>
                </Paper>
              </Fade>
            ) : null}
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};
export default App;

function refreshPage() {
  window.location.reload(false);
}

function getWeather(query) {
  return fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((res) => handleResponse(res))
    .then((weather) => {
      if (Object.entries(weather).length) {
        const mappedData = mapDataToWeatherInterface(weather);
        return mappedData;
      }
    });
}

const getForecast = (query) => {
  return fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
    .then((res) => handleResponse(res))
    .then((result) => {
      if (Object.entries(result).length) {
        const forecast = [];
        for (let i = 0; i < result.list.length; i += 8) {
          forecast.push(mapDataToWeatherInterface(result.list[i + 4]));
        }
        return forecast;
      }
    });
};

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error: Location " + response.statusText.toLowerCase());
  }
}

function mapDataToWeatherInterface(data) {
  const mapped = {
    city: data.name,
    country: data.sys.country,
    date: data.dt * 1000,
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    temperature: data.main.temp,
    description: data.weather[0].description,
    wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
    condition: data.cod,
  };

  // Add extra properties for the five day forecast: dt_txt, icon, min, max
  if (data.dt_txt) {
    mapped.dt_txt = data.dt_txt;
  }

  if (data.weather[0].icon) {
    mapped.icon = data.weather[0].icon;
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapped.max = data.main.temp_max;
    mapped.min = data.main.temp_min;
  }

  // remove undefined fields
  Object.keys(mapped).forEach(
    (key) => mapped[key] === undefined && delete data[key]
  );

  return mapped;
}
