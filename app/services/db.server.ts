import { Prisma, PrismaClient } from "@prisma/client";

import { singleton } from "./singleton.server";

export const db = singleton("prisma", () => new PrismaClient());

async function findOrCreateUser(data: Prisma.UserCreateInput) {
  return await db.user.upsert({
    create: data,
    where: { email: data.email },
    update: {},
  });
}

async function getAllUser() {
  return await db.user.findMany();
}
export { findOrCreateUser, getAllUser };
