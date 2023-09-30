import express from "express";
import axios from "axios";
const port = 3000;
const API_URL = "https://api.deezer.com/album/302127";

const app = express();
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL);
    const genresResult = result.data.genres.data;
    const genres = genresResult.map(track => track.name);
    const tracks = result.data.tracks.data;

    res.render("index.ejs", {
      name: result.data.title,
      image: result.data.cover_medium,
      genre: genres,
      tracks: tracks,
    });
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
});

app.listen(port, () => {
  console.log(`server has started in port ${port}`);
});
