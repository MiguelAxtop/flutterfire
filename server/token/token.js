const jwt = require('jwt-simple');
const fs = require('fs');
const jwt_minutes = 30
const now = Math.floor(new Date().getTime() / 1000);
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
console.log("TOken -------------------------")
console.log(t)
