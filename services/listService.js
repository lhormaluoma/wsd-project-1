import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllNonCompletedLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const countAllLists = async () => {
  const rows = await sql`SELECT COUNT(*) AS count FROM shopping_lists`;
  return rows[0].count;
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;
  try {
    return rows[0];
  } catch (e) {
    return null;
  }
};

const completeById = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
};

export { create, findAllNonCompletedLists, findById, completeById, countAllLists };