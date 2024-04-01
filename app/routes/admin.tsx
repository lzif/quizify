import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { getAllUser } from "~/services/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getAllUser();
  return json({ user });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

export default function RouteComponent() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div>
      {user.map((item) => (
        <div>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}
