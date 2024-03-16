import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request,{successRedirect:"/profile"})
};


export default function Login() {
  return (
    <Form action="/auth/google" method="post">
      <button>Login with Google</button>
    </Form>
  )
}
