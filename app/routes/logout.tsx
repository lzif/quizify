import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.logout(request,{redirectTo:"/login"})
};

export default function RouteComponent(){
  return (
    <Form method="POST">
      <p>Are you sure to logout?</p>
      <button type="submit">Yes, Logout</button>
    </Form>
  );
}