import { connect } from "../../../db/db";
import User from "../../../db/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect();
  try {
    const { username, email, password, role } = await req.json();

    const theUser = await User.findOne({ email });

    if (theUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
