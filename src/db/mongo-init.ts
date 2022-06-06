import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const mongoURI = process.env.MONGO_URI;

export default mongoURI;
