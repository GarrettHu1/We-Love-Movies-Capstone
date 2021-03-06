const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const addCritics = mapProperties({
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name"
})

const reduceCritics = reduceProperties("review_id", {
    surname: ["critics", null, "critic_id"],
    organization_name: ["critics", null, "critic.organization_name"],
    preferred_name: ["critics", null, "critic.preferred_name"]
})

function list() {
    return knex("movies as m")
    .select("*")
}

function listIsShowing() {
    // return knex("movies as m")
    return knex("movies_theaters as mt")
    // .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .distinct("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
    // .select("*")
    .where({ is_showing: true })
}

function read(movieId) {
    return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first()
}

function readMovieTheaters(movieId) {
    // movies, join movies_theaters on m.movie-id mt.movie_id, join theaters mt.theater_id, t.theater_id
    // return the theaters for movieId

    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "m.movie_id": movieId })
}

async function readMovieReviews(movieId) {
    //select all review properties, reduce critics

    const reviews = await knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movieId })
    //.then((newRow) => newRow[0])
    //.then((response) => addCritics(response))

    // loop through array of review/critics objects, for each object, run mapProperties to seperate critics into own key value pair

    return reviews;

}

module.exports = {
    list,
    listIsShowing,
    read,
    readMovieTheaters,
    readMovieReviews
}