exports.up = async function up(knex) {
  return knex.schema.createTable("test", (table) => table.increments("id"));
};

exports.down = async function down(knex) {
  await knex.schema.dropTable("test");
};
