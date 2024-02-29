import mysql from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import { DB_URL } from "./config";

const pool = mysql.createPool(DB_URL);
const promisePool = pool.promise();
export const db = drizzle(promisePool);
