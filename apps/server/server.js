require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = process.env.PORT || 5000;
console.log(process.env.MONG_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("DB connected");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})
.catch(err => console.log(err));