import { sql } from "../database/database.js";

const createItem = async (listID, name) => {
  await sql`INSERT INTO
    shopping_list_items (shopping_list_id, name)
    VALUES (${listID}, ${name})`;
};

const findAllItemsByList = async (taskId) => {
    return await sql`SELECT * FROM shopping_list_items
        WHERE shopping_list_id = ${taskId}
        ORDER BY collected ASC, name ASC`;
};

const finishItem = async (id) => {
  await sql`UPDATE shopping_list_items
    SET collected = true WHERE id = ${ id }`;
};

const countAllItems = async () => {
    const rows = await sql`SELECT COUNT(*) AS count FROM shopping_list_items`;
    return rows[0].count;
    }

export { createItem, findAllItemsByList, finishItem, countAllItems };