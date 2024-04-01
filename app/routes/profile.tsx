import { authenticator } from "~/services/auth.server";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json({ user });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

export default function RouteComponent() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto my-2 p-3 text-center rounded bg-slate-800">
      <Link
        to="/new"
        className="px-3 py-2 bg-slate-700 rounded text-center m-0"
      >
        Add new Quiz
      </Link>
      <h1 className="text-4xl m-3 font-bold ">Welcome back {user.name}!!</h1>
      <img className="rounded-full m-3" src={user.avatar!} alt={user.name!} />
      <p>@{user.username}</p>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
