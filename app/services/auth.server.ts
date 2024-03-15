// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy } from 'remix-auth-google'
// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
type User = void
export let authenticator = new Authenticator<User>(sessionStorage);

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    console.log(JSON.stringify({ accessToken,refreshToken,extraParams,profile }))
  }
)

authenticator.use(googleStrategy)
