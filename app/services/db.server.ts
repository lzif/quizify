import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

import * as schema from "~/schema.server";
const db = drizzle(pool, { schema });

const users = schema.users;
type User = { name: string; email: string; avatar?: string };

export async function findOrCreateUser(data: User) {
  console.log(data);

  const user = await db.select({
    name: users.name,
    email: users.email,
    avatar: users.avatar,
  }).from(users).where(eq(users.email, data.email));
  if (user[0]) {
    console.log("Ada", user);
    return user[0];
  } else {
    console.log("baru");
    const newUser = await db
      .insert(users)
      .values({ avatar: data.avatar, name: data.name, email: data.email })
      .returning({
        name: users.name,
        email: users.email,
        avatar: users.avatar,
      });
    return newUser[0];
  }
}

export async function getAllUser() {
  return await db.select().from(users);
}
