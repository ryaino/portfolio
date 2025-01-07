import { defineNitroPlugin } from "nitropack/runtime";
import {
  BetterSQLite3Database,
  drizzle,
} from "drizzle-orm/better-sqlite3/driver";

export default defineNitroPlugin(() => {
  db = drizzle({
    connection: {
      source: import.meta.env["VITE_DATABASE_URL"],
      fileMustExist: true,
    },
  });
});

export var db: BetterSQLite3Database;
