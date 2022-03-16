const knex = require("../db/connection");

function list() {
    return knex("movies as m")
    .select("*")
};

function read(review_id) {
    return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
  };

function update(updatedReview) {
    return knex("reviews")
      .select("*")
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*");
  };
  
  function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  };

module.exports = {
    list,
    read,
    update,
    delete: destroy,
}