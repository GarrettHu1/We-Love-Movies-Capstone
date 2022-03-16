const knex = require("../db/connection");

function list() {
    return knex("movies as m")
    .select("*")
};

function update(review_id) {
    return knex("reviews")
    .select("*")
    .where({ review_id: review_id})
}

module.exports = {
    list
}