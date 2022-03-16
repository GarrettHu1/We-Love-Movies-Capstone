const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { test } = require("../../knexfile");

async function list(req, res, next) {
  // if req.query exists, run service.listIsShowing is showing, else run service.list
    res.json({ data: res.locals.movies });
};

async function listIsShowing(req, res, next) {
  const { is_showing } = req.query 
  if(is_showing) {
    // query for all movies where is_showing = true
    const data = await service.listIsShowing();
    res.locals.movies = data;
    return next();
  } else {
    const data = await service.list();
    res.locals.movies = data;
    return next();
  }
}

async function movieIdExists(req, res, next) {
    const { movieId } = req.params;
    // if id is given, loop through movies data, find for move_id matching movieId param, if exists next(); else return error
    const data = await service.list();
    const foundId = data.find((data) => data.movie_id === Number(movieId))
    if (foundId) {
      return next();
    } else {
      // console.log(`Couldnt find movie with id: ${movieId}`)
      return next({ status: 404, message: `Movie cannot be found.` });
    }
};

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    if (movieId) {
      const data = await service.read(movieId);
      res.locals.movie = data;
      return next();
    } else {
    return next({ status: 404, message: `Movie cannot be found.` });
  };
};

async function read(req, res, next) {
    res.json({ data: res.locals.movie })
}

async function readMovieTheaters(req, res, next) {
const { movieId } = req.params;
    const data = await service.readMovieTheaters(movieId);
    
    res.json({ data: data })
}

async function readMovieReviews(req, res, next) {
  const { movieId } = req.params;
      const data = await service.readMovieReviews(movieId);
      console.log(data);
      res.json({ data: data })
  }

module.exports = {
    list: [ asyncErrorBoundary(listIsShowing), list ],
    read: [ movieIdExists, asyncErrorBoundary(movieExists), read ],
    readMovieTheaters,
    readMovieReviews
}