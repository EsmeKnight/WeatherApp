const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = ""
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit


  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const maxTemp = weatherData.main.temp_max;
      const minTemp = weatherData.main.temp_min;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<p>The weather is currently ${weatherDescription}<p>`);
      res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius and feels like ${feelsLike} degrees Celcius</h1>`);
      res.write(`The maximum temperature is ${maxTemp} degrees Celcius and the minimum temperature is ${minTemp} degrees Celcius`);
      res.write(`<br><img src="${imageURL}">`);
      res.send()
    })
  })
})




app.listen(3000, function () {
  console.log("Server is running on port 3000.");
})
