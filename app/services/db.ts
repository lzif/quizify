import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const pool = new Pool({ connectionString: env.DATABASE_URL });
const db = drizzle(pool)

const result = await db.select().from(...);
