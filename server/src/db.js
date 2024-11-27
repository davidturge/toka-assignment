import mongoose from "mongoose";

export const model = mongoose.model;
export const ObjectId = mongoose.Schema.Types.ObjectId;

// open db connection
export const openDbConnection = async () => {
  const uri = process.env.MONGO_URL;
  return mongoose.connect(uri, {
    dbName: "assignment",
  });
};

// base schema
export const BaseSchema = (fields) => {
  return new mongoose.Schema(fields, {
    timestamps: true,
    versionKey: false,
  });
};
