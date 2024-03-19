import { authenticator } from "~/services/auth.server";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  return json({ user });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

export default function RouteComponent(){
  const { user }= useLoaderData<typeof loader>()
  return (
    <div>
      <Link to="/new">Add new Quiz</Link>
      <h1>Welcome back {user.name}!!</h1>
      <img src={user.avatar!} alt={user.name!} />

      <Link to="/logout">Logout</Link>
    </div>
  );
}
