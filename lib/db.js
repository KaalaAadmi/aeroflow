import mongoose from "mongoose";

// Ensure the environment variables are loaded
if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const connect = async () => {
  //   console.log(process.env.MONGODB_URI);
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already Connected");
    return;
  }
  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "aeroflow",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (error) {
    console.error("Error connecting to database: ", error);
    throw new Error("Error connecting to database: ", error);
  }
};

export default connect;
