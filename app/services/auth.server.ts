// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy } from "remix-auth-google";
import { findOrCreateUser } from "./db.server";
import { TOTPStrategy } from "remix-auth-totp";
import { sendAuthEmail } from "./email.server";
import { Prisma } from "@prisma/client";
// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session

export let authenticator = new Authenticator<Prisma.UserCreateInput>(
  sessionStorage
);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async ({ profile }) => {
      const user: Prisma.UserCreateInput = {
        username: profile._json.name.replace(" ", ""),
        name: profile._json.name,
        email: profile._json.email,
        avatar: profile._json.picture,
      };
      return await findOrCreateUser(user);
    }
  )
);

authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.SECRET! || "Rahasia",

      sendTOTP: async ({ email, code, magicLink }) => {
        await sendAuthEmail({ email, code, magicLink });
      },
    },
    async ({ email }) => {
      let user = await findOrCreateUser({
        email,
        name: email.split("@")[0],
        username: email.split("@")[0],
      });

      return user;
    }
  )
);
