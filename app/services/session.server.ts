import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SECRET! || "Memek"],
    secure: process.env.NODE_ENV === "production",
  },
});

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__remix-themes",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    // secure: true,
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);
export let { getSession, commitSession, destroySession } = sessionStorage;
