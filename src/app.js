const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jaymin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About us",
    name: "Jaymin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help!",
    name: "Jaymin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  geocode(req.query.address, (error, { lat, long, placeName } = {}) => {
    if (error == "") {
      forecast(lat, long, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }

        res.send({
          location: req.query.address,
          forecast: forecastData,
        });
        console.log(forecastData);
        console.log(placeName);
      });
    } else {
      return res.send({
        error: error,
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Jaymin",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "404! Page not found",
    name: "Jaymin",
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
