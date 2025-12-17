import database from "../../../../infra/database";

export default async function handler(req, res) {
  const result = await database.query("SELECT 1 + 1 as sum");
  console.log(result.rows);
  res.status(200).json({ message: "Hello from Next.js!" });
}
