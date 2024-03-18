// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy } from "remix-auth-google";
import { findOrCreateUser, getUser } from "./db.server";
import { TOTPStrategy } from "remix-auth-totp";
import { sendAuthEmail } from "./email.server";
// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
type User = {
  name: string | null;
  email: string | null;
  avatar: string | null;
};
export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
      const user = {
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
      secret: process.env.SECRET!||"Memek",

      sendTOTP: async ({ email, code, magicLink }) => {
        // Send the TOTP code to the user.
        await sendAuthEmail({ email, code, magicLink });
      },
    },
    async ({ email }) => {
      let user = await findOrCreateUser({ email, name: email.split("@")[0] });

      return user;
    }
  )
);
