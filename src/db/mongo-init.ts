import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

if (mongoURI) {
  mongoose
    .connect(mongoURI)
    .then((con) => {
      console.log("db connect success");
    })
    .catch((err) => console.log(err));
}
