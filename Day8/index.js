import express from 'express';
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: false }));


app.get("/portofolio", portofolioDetail);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function portofolioDetail(req, res) {
  
  res.render("portofolio");
} 