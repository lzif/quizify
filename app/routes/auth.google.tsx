// app/routes/auth/google.tsx
import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export let loader = () => redirect("/login");

export let action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("google", request, {
    failureRedirect: "/login",
  });
};
