require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const https = require("https");


const key = fs.readFileSync("private.key");
const cert = fs.readFileSync("certificate.crt");

const cred = {
  key,
  cert
}

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: "*", // This allows requests from any origin
  // You can add more configurations here if needed
};

app.use(cors(corsOptions));

const cwd = process.cwd();
const public = path.join(cwd, "..", "public");
app.use(express.static(public));

app.use(express.json());
app.use(morgan("dev"));

const pool = require("./database/connection");

app.use("/api/park", require("./routes/park"));
app.use("/api/user", require("./routes/user"));
app.use("/api/review", require("./routes/review"));
app.use("/api/photo", require("./routes/photo"));

// app.get("/.well-known/pki-validation/6374DCC4AD1EC37986A823BC491DFCC1.txt"),
//   (req, res) => {
//     res.sendFile(
//       "/home/labber/lighthouse_final/urban-oasis/server/6374DCC4AD1EC37986A823BC491DFCC1.txt"
//     );
//   };
  app.get(
    "/.well-known/pki-validation/6374DCC4AD1EC37986A823BC491DFCC1.txt",
    (req, res) => {
      res.sendFile(
        path.join(__dirname, "6374DCC4AD1EC37986A823BC491DFCC1.txt")
      );
    }
  );


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443, () => {
  console.log("HTTPS Server running on port 443");
});
