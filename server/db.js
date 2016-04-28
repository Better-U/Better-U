var dotenv = require('dotenv')
dotenv.config()
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
  }
})

knex.schema.createTableIfNotExists('user', function (user) {
  user.increments('id').primary
  user.string('username')
  user.integer('age')
  user.integer('height')
  user.string('gender')
  user.integer('goalweight')
  user.integer('att_health')
  user.integer('att_strength')
  user.integer('att_stamina')
  user.integer('att_agility')
}).then(function () {
  console.log('user table created')
})

knex.schema.createTableIfNotExists('user_skills', function (user) {
  user.increments('id').primary
  user.integer('user_id').references('id').inTable('user')
  user.integer('skill_id').references('id').inTable('skills')
}).then(function () {
  console.log('user_skills table created')
})

knex.schema.createTableIfNotExists('skills', function (skill) {
  skill.increments('id').primary
  skill.string('name')
  skill.string('type')
  skill.string('description')
  skill.integer('attack')
}).then(function () {
  console.log('skills table created')
})

knex.schema.createTableIfNotExists('equipment', function (equip) {
  equip.increments('id').primary
  equip.integer('user_id').references('id').inTable('user')
  equip.integer('invent_id').references('id').inTable('inventory')
}).then(function () {
  console.log('equipment table created')
})

knex.schema.createTableIfNotExists('inventory', function (invent) {
  invent.increments('id').primary
  invent.integer('user_id')
  invent.integer('item_id')
}).then(function () {
  console.log('inventory table created')
})
knex.schema.createTableIfNotExists('items', function (item) {
  item.increments('id').primary
  item.string('name', 50)
  item.string('type', 30)
  item.string('description')
  item.integer('attack')
  item.integer('defense')
}).then(function () {
  console.log('items table created')
})

knex.schema.createTableIfNotExists('physical_records', function (physical) {
  physical.increments('id').primary
  physical.integer('user_id').references('id').inTable('user')
  physical.string('name', 50)
  physical.integer('type_id').references('id').inTable('physical_type')
  physical.integer('duration')
}).then(function () {
  console.log('physical_records table created')
})

knex.schema.createTableIfNotExists('dietary_record', function (dietary) {
  dietary.increments('id').primary
  dietary.integer('user_id').references('id').inTable('user')
  dietary.string('name', 50)
  dietary.integer('type_id').references('id').inTable('dietary_type')
}).then(function () {
  console.log('dietary_records table created')
})

knex.schema.createTableIfNotExists('dietary_type', function (diet) {
  diet.increments('id').primary
  diet.string('type', 50)
  diet.integer('calories', 50)
}).then(function () {
  console.log('dietary_type table created')
})

knex.schema.createTableIfNotExists('physical_type', function (physical) {
  physical.increments('id').primary
  physical.string('type', 50)
}).then(function () {
  console.log('physical_type table created')
})

module.exports = knex
