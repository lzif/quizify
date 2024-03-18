import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
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
    <div>
      {/* Google Login */}
      <Form action="/auth/google" method="post">
        <button>Login with Google</button>
      </Form>

      {/* Email Login */}
      <Form method="POST">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Insert email .."
          required
        />
        <button type="submit">Send Code</button>
      </Form>

      {/* Login Errors Handling. */}
      <span>{authError?.message}</span>
    </div>
  );
}
