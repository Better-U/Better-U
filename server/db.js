require('dotenv').config()

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
  },
  pool: {
    min: 0,
    max: 12
  }
})

knex.schema.createTableIfNotExists('user', function (user) {
  user.increments('id').primary()
  user.string('username', 50)
  user.string('password', 200)
  user.integer('age')
  user.integer('height')
  user.integer('weight')
  user.string('gender')
  user.integer('bodyfat')
  user.string('activitylvl', 50)
  user.string('interest', 50)
  user.string('gym', 50)
  user.integer('totalpts')
  user.string('city', 50)
  user.string('image', 200)
}).then(function () {
  console.log('user table created')
})

knex.schema.createTableIfNotExists('strength_record', function (strength) {
  strength.increments('id').primary()
  strength.integer('user_id').unsigned().references('id').inTable('user')
  strength.string('type')
  strength.date('date')
  strength.integer('sets')
  strength.integer('intensity')
  strength.integer('duration')
  strength.integer('weight')
  strength.integer('reps')
}).then(function () {
  console.log('strength_record table created')
})

knex.schema.createTableIfNotExists('goals', function (goals) {
  goals.increments('id').primary()
  goals.integer('user_id').unsigned().references('id').inTable('user')
  goals.string('type', 50)
  goals.string('intensity', 50)
  goals.string('category', 50)
  goals.string('measurement', 50)
  goals.integer('value')
  goals.integer('currentValue')
  goals.date('date')
  goals.integer('points')
}).then(function () {
  console.log('goals table created')
})

knex.schema.createTableIfNotExists('bets', function (bets) {
  bets.increments('id').primary()
  bets.integer('user_id').unsigned().references('id').inTable('user')
  bets.integer('bettor_id').unsigned().references('id').inTable('user')
  bets.integer('goals_id').unsigned().references('id').inTable('goals')
  bets.boolean('status').defaultTo(1)
  bets.boolean('result').defaultTo(1)
}).then(function () {
  console.log('bets table created')
})

knex.schema.createTableIfNotExists('nutrition_record', function (nutrition) {
  nutrition.increments('id').primary()
  nutrition.integer('user_id').unsigned().references('id').inTable('user')
  nutrition.string('name', 50)
  nutrition.date('date')
  nutrition.string('time', 50)
  nutrition.integer('serving')
  nutrition.string('servingSize')
  nutrition.integer('cal')
  nutrition.integer('carbs')
  nutrition.integer('fat')
  nutrition.integer('fiber')
  nutrition.integer('sodium')
  nutrition.integer('protein')
  nutrition.integer('water')
}).then(function () {
  console.log('nutrition_records table created')
})

knex.schema.createTableIfNotExists('cardio_record', function (cardio) {
  cardio.increments('id').primary()
  cardio.integer('user_id').unsigned().references('id').inTable('user')
  cardio.decimal('distance')
  cardio.integer('duration')
  cardio.integer('intensity')
  cardio.decimal('pace')
  cardio.string('type')
  cardio.date('date')
  cardio.string('time')
}).then(function () {
  console.log('cardio_record table created')
})

knex.schema.createTableIfNotExists('chatRooms', function (room) {
  room.increments('id').primary()
  room.json('message')
}).then(function () {
  console.log('chatRooms table created')
})

knex.schema.createTableIfNotExists('userRooms', function (room) {
  room.integer('roomID').unsigned().references('id').inTable('chatRooms')
  room.integer('userID').unsigned().references('id').inTable('user')
}).then(function () {
  console.log('userRooms Created')
})

module.exports = knex
