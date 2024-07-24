import mongoose from 'mongoose';

const connectDB = async () => {
  const { NODE_ENV, db_cloud_conn, db_local_conn } = process.env;
  const connString = NODE_ENV === 'production' ? db_cloud_conn : db_local_conn;
  try {
    await mongoose.connect(connString);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error(error.message);

  }
};

export default connectDB;
