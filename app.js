import express from "express";
import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const oauth = OAuth({
  consumer: {
    key: process.env.NOUN_PROJECT_KEY,
    secret: process.env.NOUN_PROJECT_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  },
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/search", async (req, res) => {
  const searchTerm = req.body.searchTerm;
  const url = `https://api.thenounproject.com/v2/icon?query=${searchTerm}`;
  const request_data = {
    url: url,
    method: "GET",
  };

  const headers = oauth.toHeader(oauth.authorize(request_data));

  try {
    const response = await axios.get(url, { headers });
    const icons = response.data.icons;

    res.render("index", {
      icons,
      searchTerm,
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.render("index", {
      icons: [],
      searchTerm,
      error: "Error fetching data from Noun Project API",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
