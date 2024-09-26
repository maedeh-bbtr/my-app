import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "../../../../db/user.model";
import { connect } from "../../../../db/db";
import bcrypt from "bcrypt";

export const auth = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("No user.");
        }
        await connect();
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found.");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return NextResponse.json(
            { error: "Invalid password" },
            { status: 400 }
          );
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role;

      return session;
    },
  },
});

export const { GET, POST } = auth;
