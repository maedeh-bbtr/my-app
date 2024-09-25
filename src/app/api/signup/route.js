import { connect } from "../../../lib/db";
import User from "../../../lib/user.model";
import bcrypt from "bcrypt";

connect();

export async function POST(request, response) {
  try {
    const reqBody = await request.json();
    const { username, email, password, role } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return response.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    return response.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return response.json({ error: error.message }, { status: 500 });
  }
}
