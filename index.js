const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const helloRouter = require("./routes/hello");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.czrhoe2.mongodb.net/nft?retryWrites=true&w=majority`
    );

    console.log("DB connected");
  } catch (error) {
    console.log(error);
    console.log("loi roii!!!");
    process.exit(1);
  }
};

// connectDB();

const app = express();

app.use(express.json());
app.use("/home", helloRouter);
//app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 9001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
