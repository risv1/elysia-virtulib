import mysql from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import { DB_URL } from "./config";
import { migrate } from "drizzle-orm/mysql2/migrator";

const pool = mysql.createPool(DB_URL);
const promisePool = pool.promise();
const db = drizzle(promisePool);

async function main(){
    console.log("Migrating database...");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Database migration complete!");
    process.exit(0)
}

try {
    await main()
} catch(err) {
    console.error(err);
    process.exit(1);
}