const express = require('express')
const app = express()
const mongoose = require("mongoose")
require("dotenv").config();

const port = process.env.PORT || 5000
app.use(express.json());


mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection
db.on("error", console.error.bind(console, "Connection Error:"))
db.once("open", () => {
  console.log("We're connected!")
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// app.use("/api", require("./routes/users.js"));

app.get("*", (req, res) => {
  res.send('welcome to default page')
})


app.listen(port, () => console.log(`Server running on port ${port}...`))