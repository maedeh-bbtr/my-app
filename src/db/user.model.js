import { Schema, model, mongoose } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    require: [true, "name is require!!"],
  },
  email: {
    type: String,
    require: [true, "email is require!!"],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    require: [true, "password is require!!"],
  },
  role: {
    type: String,
    enum: ["admin", "teacher", "client"],
    default: "client",
  },
});

const User = mongoose.models.User || model("User", UserSchema);

export default User;
