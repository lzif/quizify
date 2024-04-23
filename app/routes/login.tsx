import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { Card } from "~/components/ui/card";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/profile",
  });

  const session = await getSession(request.headers.get("Cookie"));
  const authError = session.get(authenticator.sessionErrorKey);

  return json(
    { authError },
    {
      headers: {
        "set-cookie": await commitSession(session),
      },
    }
  );
};
export async function action({ request }: ActionFunctionArgs) {
  await authenticator.authenticate("TOTP", request, {
    successRedirect: "/verify",
    failureRedirect: "/login",
  });
}

export default function Login() {
  let { authError } = useLoaderData<typeof loader>();
  return (
    <div className="container flex flex-col gap-4 items-center justify-center h-screen w-screen">
      {/* Google Login */}
      <Card>
        <Form
          action="/auth/google"
          method="post"
          className="flex flex-col gap-4"
        >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login with Google
          </button>
        </Form>

        {/* Email Login */}
        <Form method="POST" className="flex flex-col gap-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Insert email .."
            required
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Code
          </button>
        </Form>
      </Card>
      {/* Login Errors Handling. */}
      <span>{authError?.message}</span>
    </div>
  );
}
