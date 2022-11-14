import mongoose from "mongoose";

function connect() {
  return mongoose
    .connect(process.env.DB_URI as string, {})
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("db error", error);
      process.exit(1);
    });
}

export default connect;
