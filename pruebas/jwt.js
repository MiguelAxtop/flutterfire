var fechasddd = new Date(1645796275);
console.log(fechasddd);
const jwt = require('jwt-simple');
const fs = require('fs');
const jwt_minutes = 30
const now = Math.floor(new Date().getTime() / 1000);
const expires = now + (jwt_minutes * 60);
var expiresRR = (1645796275 + (30 * 60)) * 1000;
const fechanow = new Date(expiresRR);
let idSocio = "002-22453";
console.log(fechanow);
let obj = {
    iat: now,
    exp: expires,
    aud: "api.axtop.io",
    iss: "api.axtop.io",
    sub: idSocio,
    email: "user@cajahuastecas.org"
};
// var privatekey = config.json_web_token.secret_pom;

// if (!privatekey) {
//     privatekey = fs.readFileSync(config.json_web_token.secret, 'utf8');
//     config.json_web_token.secret_pom = privatekey;
// }

// var privatekey = `Bag Attributes
//     friendlyName: privatekey
//     localKeyID: 54 69 6D 65 20 31 35 30 37 38 34 32 32 37 32 36 30 33 
// Key Attributes: <No Attributes>
// -----BEGIN PRIVATE KEY-----
// MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLMgdxUxQgo/8Y
// 4HgJac/XCCPdbTWJdROTd6uCtZBnFwSOUsTvecM5m7I7hUqokprDMUa0DqLXqB7g
// z9B3+xsoH7iVf9c1tEWjJa85Ot6Q+VIaipE+li1zsVAFVO3VWoKdNo+k5GstknBL
// MsUW2YSQxui89Ussuqz+jPuyhLxwJ6NLZiebRGbkv4nP51VGVhwL0dS89Oy2OgVy
// XPTKzh7zmEnPWGmO4tOBreIcoI/F0Pym4I20mWdktKglZJi+J7S654tprGNb07vc
// 5mLlKA4wOxGd3HH37IIcUUKSgvA3euojlEPHFw2wx/HKrGEjyB4hBkA6dPgWMKn6
// U+cFR7oxAgMBAAECggEAAVEstzS2XaQ4y42AFFqSNsFRtPuHSHoJ/tLv+2hLPcPy
// LCT3eX33/6L5d0//rERyw4tZHixNkYWIKutGpxAzHmyowirVgAZT+t0QBKAVvlwg
// kl9CI/h1FKGzhdOgscHXes6E1lt+rXIkHPSMfRMEz7N9hIAJgbEQnv/l8jBzrWQt
// SzzwQHPSxEf0C+ACig6ZXfs99YT3qboYVcoCSF/1soFIkNgv0Eifh/PIlNVjYNsg
// TTDs606/GdkYca9t9o4CUq8NJc3h2YPWfhIULZbr9FAut1G1J3HEN/3Nya7AdDLe
// /BaQHyRhrXJ8AA6CVeZ3zDprJL25fR0L0sDlD5aCGwKBgQD4+8q7ftIzf1uyqTMJ
// IyQkv3s3NZl3fT86VHpQjzej2UTvJhqJ7ppCCsOIYVRKYOorICM6dds1Eu/Y0TtO
// KHt3RrnBnJsYy2y/yse3SUB5sYw9fNLZYPTJyYYEEmIaG5kkLPdt2jQIKE9C/Hvq
// HmTlz+jShxMBmWQjXuJKAOp4RwKBgQDQ6+n/uKf1aHsG7S7SAmMUofAKFRfaaV0K
// NQ/cDjCCqC8d9J6QjZEh9/aMFyddUy0RMiSXhYsxOLbWU8WTa9yGOoxIsk4xNLUa
// bAGKEhHpTmF5IW4wFmYyEryoiQ/MV2bH0r7bvvKnE+tzuQS9FNiBHf04JyGLJvd6
// ic8GDMJtxwKBgQCRd/sgxJ3nPJfEsJqC0idB2SYSQZyidWjFmanE+4gUkNJ3rxl+
// UQuLXmKTgdoPgsQN4j7y3vzt61x6nvQ5W+mW7JmHBwqO1/t3qvA4o/GpqBQ5sH44
// Ry993eIQ6vSqMEmvGx6M7hnMUlDM4Fs9k/h7VJfAuO5f1tDs4Xjwp8xV7QKBgQCN
// MvSKbT2u4bdMXh7nts9KEYxO9CST6+QC0wvt+PUWSR7XCw3jupodMB5EXh2vuFhc
// J9yNP6dsU91Wi3WcBikb2xQWydOI9At2WQrNSxsp6Fx+Zna3L1xQeVNiQIgZ3fRM
// FwYBNFOBUjgulRw7wov079TFD8Ve664U9nChsRvy3wKBgB384tRTz6uNTROu+H+g
// D1odaziCcVxiLKBmbWqR7CU0mIT4HWyzwV3HWiHMqUXxrRSMOkPNJbx33H8xXF4H
// 5WALqtohOW1d9zgNGvZWa1lTeBaoums1LGgCsRCr0YmVZOlp+CZou0iArl0N0MRg
// cDxJuwd5RgZDleWwOpf2D74f
// -----END PRIVATE KEY-----
// Bag Attributes
//     friendlyName: privatekey
//     localKeyID: 54 69 6D 65 20 31 35 30 37 38 34 32 32 37 32 36 30 33 
// subject=/CN=109503010972796111361
// issuer=/CN=109503010972796111361
// -----BEGIN CERTIFICATE-----
// MIIC+jCCAeKgAwIBAgIIVUuK9DPm6ywwDQYJKoZIhvcNAQEFBQAwIDEeMBwGA1UE
// AxMVMTA5NTAzMDEwOTcyNzk2MTExMzYxMB4XDTE3MTAxMjIxMDQzMVoXDTI3MTAx
// MDIxMDQzMVowIDEeMBwGA1UEAxMVMTA5NTAzMDEwOTcyNzk2MTExMzYxMIIBIjAN
// BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyzIHcVMUIKP/GOB4CWnP1wgj3W01
// iXUTk3ergrWQZxcEjlLE73nDOZuyO4VKqJKawzFGtA6i16ge4M/Qd/sbKB+4lX/X
// NbRFoyWvOTrekPlSGoqRPpYtc7FQBVTt1VqCnTaPpORrLZJwSzLFFtmEkMbovPVL
// LLqs/oz7soS8cCejS2Ynm0Rm5L+Jz+dVRlYcC9HUvPTstjoFclz0ys4e85hJz1hp
// juLTga3iHKCPxdD8puCNtJlnZLSoJWSYvie0uueLaaxjW9O73OZi5SgOMDsRndxx
// 9+yCHFFCkoLwN3rqI5RDxxcNsMfxyqxhI8geIQZAOnT4FjCp+lPnBUe6MQIDAQAB
// ozgwNjAMBgNVHRMBAf8EAjAAMA4GA1UdDwEB/wQEAwIHgDAWBgNVHSUBAf8EDDAK
// BggrBgEFBQcDAjANBgkqhkiG9w0BAQUFAAOCAQEAmHfpgEqJuKAsh892wfF0Q8Ek
// 3utP/joeQ0KzKz000VOfrZYAvcvDaAQhhKikvAsBMq0f/UuZa4rFnjZJ1gty+pA1
// FXqzB1JPVWhlsnfH/eZuYcu0micC1Lxsl+Ivab1Zl4elnZ6ILH5sspxtH16yfgzt
// cgyeFkteJSf1uO+X/Haw+CBi53vjHmR7ZQ+yx2mekcXEmKfZyWb6nyBazDwVmME8
// M6jMyGEnFqxnm2PWLMkmz8YuF88job01NabAWGwlpmaiV24NBw+OpHVaBRi4gL2G
// 86SEYfiLBbgGp7jojJUuJiubUS+D/ebneN++onylAVqGTP7gEQXEx7XeecgRsA==
// -----END CERTIFICATE-----`;

var privatekey = fs.readFileSync("config/private_key.pem", 'utf8');
// let t = jwt.encode(obj, privatekey);
// console.log("TOken");
// console.log(t)

var tokendecoded = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDU4MjIwNjQsImV4cCI6MTY0NTgyMzg2My45OTcsImF1ZCI6ImFwaS5heHRvcC5pbyIsImlzcyI6Imh0dHBzOi8vZ2l0aHViLmNvbS9qb25hc3JvdXNzZWwvZGFydF9qc29ud2VidG9rZW4iLCJzdWIiOiIwMDItMjI0NTMiLCJlbWFpbCI6InVzZXJAY2FqYWh1YXN0ZWNhcy5vcmcifQ.CA3QaedL4_lqrTzjNZh86PbJXNqBVUSOw7k3iY_5r1s";
// var decoded = jwt.decode("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDU2NDkzODAsImV4cCI6MTY0NTY1MTE4MCwiYXVkIjoiYXBpLmF4dG9wLmlvIiwiaXNzIjoiYXBpLmF4dG9wLmlvIiwic3ViIjoiMDAyLTIyNDUzIiwiZW1haWwiOiJ1c2VyQGNhamFodWFzdGVjYXMub3JnIn0.opaklKxKs9pa87bpyVEhGajORp - hZRlxtcPvUBsSBqg", privatekey)
// console.log(t)
tokenVersion("HS256");
tokenVersion("HS384");
tokenVersion("HS512");
tokenVersion("RS256");
tokenVersionTrue("HS256");
tokenVersionTrue("HS384");
tokenVersionTrue("HS512");
tokenVersionTrue("RS256");


// console.log(decoded);
// var obj2 = {
//     iat: 1645644406,
//     exp: 1645646206,
//     aud: "api.axtop.io",
//     iss: "api.axtop.io",
//     sub: "002-22453",
//     email: "user@cajahuastecas.org"
// }
// var dj = jwt.decode("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDU2NDc3MDMsImV4cCI6MTY0NTY0OTUwMywiYXVkIjoiYXBpLmF4dG9wLmlvIiwiaXNzIjoiYXBpLmF4dG9wLmlvIiwic3ViIjoiMDAyLTIyNDUzIiwiZW1haWwiOiJ1c2VyQGNhamFodWFzdGVjYXMub3JnIn0.HUjmSTR3D9m-AgksqwIWuS7ne1j0KC_eDl5odEFL5oI", privatekey)
// console.log(dj)
// var token = jwt.encode(obj2, "Bag Attributes friendlyName: privatekey localKeyID: 54 69 6D 65 20 31 35 30 37 38 34 32 32 37 32 36 30 33 Key Attributes: <No Attributes> -----BEGIN PRIVATE KEY----- MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLMgdxUxQgo/8Y 4HgJac/XCCPdbTWJdROTd6uCtZBnFwSOUsTvecM5m7I7hUqokprDMUa0DqLXqB7g z9B3+xsoH7iVf9c1tEWjJa85Ot6Q+VIaipE+li1zsVAFVO3VWoKdNo+k5GstknBL MsUW2YSQxui89Ussuqz+jPuyhLxwJ6NLZiebRGbkv4nP51VGVhwL0dS89Oy2OgVy XPTKzh7zmEnPWGmO4tOBreIcoI/F0Pym4I20mWdktKglZJi+J7S654tprGNb07vc 5mLlKA4wOxGd3HH37IIcUUKSgvA3euojlEPHFw2wx/HKrGEjyB4hBkA6dPgWMKn6 U+cFR7oxAgMBAAECggEAAVEstzS2XaQ4y42AFFqSNsFRtPuHSHoJ/tLv+2hLPcPy LCT3eX33/6L5d0//rERyw4tZHixNkYWIKutGpxAzHmyowirVgAZT+t0QBKAVvlwg kl9CI/h1FKGzhdOgscHXes6E1lt+rXIkHPSMfRMEz7N9hIAJgbEQnv/l8jBzrWQt SzzwQHPSxEf0C+ACig6ZXfs99YT3qboYVcoCSF/1soFIkNgv0Eifh/PIlNVjYNsg TTDs606/GdkYca9t9o4CUq8NJc3h2YPWfhIULZbr9FAut1G1J3HEN/3Nya7AdDLe /BaQHyRhrXJ8AA6CVeZ3zDprJL25fR0L0sDlD5aCGwKBgQD4+8q7ftIzf1uyqTMJ IyQkv3s3NZl3fT86VHpQjzej2UTvJhqJ7ppCCsOIYVRKYOorICM6dds1Eu/Y0TtO KHt3RrnBnJsYy2y/yse3SUB5sYw9fNLZYPTJyYYEEmIaG5kkLPdt2jQIKE9C/Hvq HmTlz+jShxMBmWQjXuJKAOp4RwKBgQDQ6+n/uKf1aHsG7S7SAmMUofAKFRfaaV0K NQ/cDjCCqC8d9J6QjZEh9/aMFyddUy0RMiSXhYsxOLbWU8WTa9yGOoxIsk4xNLUa bAGKEhHpTmF5IW4wFmYyEryoiQ/MV2bH0r7bvvKnE+tzuQS9FNiBHf04JyGLJvd6 ic8GDMJtxwKBgQCRd/sgxJ3nPJfEsJqC0idB2SYSQZyidWjFmanE+4gUkNJ3rxl+ UQuLXmKTgdoPgsQN4j7y3vzt61x6nvQ5W+mW7JmHBwqO1/t3qvA4o/GpqBQ5sH44 Ry993eIQ6vSqMEmvGx6M7hnMUlDM4Fs9k/h7VJfAuO5f1tDs4Xjwp8xV7QKBgQCN MvSKbT2u4bdMXh7nts9KEYxO9CST6+QC0wvt+PUWSR7XCw3jupodMB5EXh2vuFhc J9yNP6dsU91Wi3WcBikb2xQWydOI9At2WQrNSxsp6Fx+Zna3L1xQeVNiQIgZ3fRM FwYBNFOBUjgulRw7wov079TFD8Ve664U9nChsRvy3wKBgB384tRTz6uNTROu+H+g D1odaziCcVxiLKBmbWqR7CU0mIT4HWyzwV3HWiHMqUXxrRSMOkPNJbx33H8xXF4H 5WALqtohOW1d9zgNGvZWa1lTeBaoums1LGgCsRCr0YmVZOlp+CZou0iArl0N0MRg cDxJuwd5RgZDleWwOpf2D74f -----END PRIVATE KEY----- Bag Attributes friendlyName: privatekey localKeyID: 54 69 6D 65 20 31 35 30 37 38 34 32 32 37 32 36 30 33 subject=/CN=109503010972796111361 issuer=/CN=109503010972796111361 -----BEGIN CERTIFICATE----- MIIC+jCCAeKgAwIBAgIIVUuK9DPm6ywwDQYJKoZIhvcNAQEFBQAwIDEeMBwGA1UE AxMVMTA5NTAzMDEwOTcyNzk2MTExMzYxMB4XDTE3MTAxMjIxMDQzMVoXDTI3MTAx MDIxMDQzMVowIDEeMBwGA1UEAxMVMTA5NTAzMDEwOTcyNzk2MTExMzYxMIIBIjAN BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyzIHcVMUIKP/GOB4CWnP1wgj3W01 iXUTk3ergrWQZxcEjlLE73nDOZuyO4VKqJKawzFGtA6i16ge4M/Qd/sbKB+4lX/X NbRFoyWvOTrekPlSGoqRPpYtc7FQBVTt1VqCnTaPpORrLZJwSzLFFtmEkMbovPVL LLqs/oz7soS8cCejS2Ynm0Rm5L+Jz+dVRlYcC9HUvPTstjoFclz0ys4e85hJz1hp juLTga3iHKCPxdD8puCNtJlnZLSoJWSYvie0uueLaaxjW9O73OZi5SgOMDsRndxx 9+yCHFFCkoLwN3rqI5RDxxcNsMfxyqxhI8geIQZAOnT4FjCp+lPnBUe6MQIDAQAB ozgwNjAMBgNVHRMBAf8EAjAAMA4GA1UdDwEB/wQEAwIHgDAWBgNVHSUBAf8EDDAK BggrBgEFBQcDAjANBgkqhkiG9w0BAQUFAAOCAQEAmHfpgEqJuKAsh892wfF0Q8Ek 3utP/joeQ0KzKz000VOfrZYAvcvDaAQhhKikvAsBMq0f/UuZa4rFnjZJ1gty+pA1 FXqzB1JPVWhlsnfH/eZuYcu0micC1Lxsl+Ivab1Zl4elnZ6ILH5sspxtH16yfgzt cgyeFkteJSf1uO+X/Haw+CBi53vjHmR7ZQ+yx2mekcXEmKfZyWb6nyBazDwVmME8 M6jMyGEnFqxnm2PWLMkmz8YuF88job01NabAWGwlpmaiV24NBw+OpHVaBRi4gL2G 86SEYfiLBbgGp7jojJUuJiubUS+D/ebneN++onylAVqGTP7gEQXEx7XeecgRsA== -----END CERTIFICATE-----");
// console.log(token);


function tokenVersion(algorit) {
    console.log("-------------------------------")
    try {

        var decodejwt = jwt.decode(tokendecoded, privatekey, false, algorit);
        console.log(algorit)
        console.log(decodejwt)
    } catch (err) {
        console.log("ERROR: " + algorit)
        console.log(err);
    }
}
function tokenVersionTrue(algorit) {
    console.log("-------------------------------")
    try {

        var decodejwt = jwt.decode(tokendecoded, privatekey, true, algorit);
        console.log(algorit)
        console.log(decodejwt)
    } catch (err) {
        console.log("ERROR: " + algorit)
        console.log(err);
    }
}