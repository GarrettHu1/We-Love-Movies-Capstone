const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritics = mapProperties({
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name"
})

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

async function update(updatedReview) {
    await knex("reviews as r")
      .select("*")
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*")

    const resp = await knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ review_id: updatedReview.review_id })
    .then((updatedRow)=> updatedRow[0])
    .then(addCritics);

    return resp;
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