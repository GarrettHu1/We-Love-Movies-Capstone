const knex = require("../db/connection");

function list() {
    return knex("movies")
    .select("*")
}

function listIsShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("*")
    .where({ isShowing: true })
}

function read(movieId) {
    return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first()
}

function readMovieTheater(movieId) {
    return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    //.select("theater_id", "name", "address_line_1", "address_line_2", "city", "state", "zip", "created_at", "created_at", "is_showing", "movie_id")
    .select("theaters*", "mt.is_showing", "mt.movie_id")
    .where({ movie_id: movieId })
}

module.exports = {
    list,
    listIsShowing,
    read,
    readMovieTheater
}