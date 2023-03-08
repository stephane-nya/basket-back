export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("email").notNullable();
    table.text("passwordHash").notNullable();
    table.text("passwordSalt").notNullable();
    table.text("displayName").notNullable();
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.text("content").notNullable();
    table.timestamps(true, true, true);
    table.integer("userId").notNullable().references("id").inTable("users");
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("users");
};
