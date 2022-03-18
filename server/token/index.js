const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/token", async (req, res) => {
  const jwt = require('jwt-simple');
  const fs = require('fs');
  const jwt_minutes = 30
  const fechanow = Date(Date.now());
  console.log(fechanow);
  const now = Math.floor(new Date(Date.now()).getTime() / 1000);
  const expires = now + (jwt_minutes * 60);

  let obj = {
    iat: now,
    exp: expires,
    aud: "api.axtop.io",
    iss: "api.axtop.io",
    sub: "002-22453",
    email: "user@cajahuastecas.org"
  };

  var privatekey = fs.readFileSync("config/private_key.pem", 'utf8');
  let t = jwt.encode(obj, privatekey);
  console.log("TOken");
  console.log(t)
  return res.json({ "token": t });
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);