import db from "../config/PostgreSQL";

(async () => {
  try {
    await db.sync({ alter: true });
    console.log("Tables synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing tables: ", error);
  }
})();

export default db;
