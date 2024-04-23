import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import Button from "~/components/ui/button";
import { Card, CardHeader } from "~/components/ui/card";

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

export default function RouteComponent() {
  return (
    <div>
      {/* Create Quiz Form */}
      <div className="flex flex-col gap-4 w-screen justify-center items-center p-10">
      <Card>
        <CardHeader>Create Quiz</CardHeader>
        <Form action="/create" method="POST" className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Quiz Description"
            className="border border-gray-300 rounded-md p-2"
          />
          <Button type="submit">Create Quiz</Button>
        </Form>
      </Card>
      </div>
    </div>
  );
}
