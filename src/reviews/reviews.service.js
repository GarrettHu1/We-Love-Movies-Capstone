const knex = require("../db/connection");

function list() {
    return knex("movies as m")
    .select("*")
};

function read(review_id) {
    return knex("reviews").select("*").where({ review_id }).first();
  }

function update(updatedReview) {
    return knex("reviews")
      .select("*")
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*");
  }
  

module.exports = {
    list,
    read,
    update
}