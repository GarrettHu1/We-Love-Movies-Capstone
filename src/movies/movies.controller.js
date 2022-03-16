const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const data = await service.list();
    res.json({ data: data });
};


async function listIsShowing(req, res, next) {
    const data = await service.list();
    res.json({ data: data });
};

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `Movie cannot be found.` });
  }

async function read(req, res, next) {
    const knexInstance = req.app.get("db");
    const { movie } = res.locals;
    res.json({ data: movie })
}

async function movieTheaterExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.readMovieTheater(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `Movie cannot be found.` });
  }

async function readMovieTheater(req, res, next) {
    const knexInstance = req.app.get("db");
    const { movie } = res.locals;
    res.json({ data: movie })
}

module.exports = {
    list: asyncErrorBoundary(list),
    listIsShowing: asyncErrorBoundary(listIsShowing),
    read: [asyncErrorBoundary(movieExists), read],
    readMovieTheater: [asyncErrorBoundary(movieTheaterExists), readMovieTheater]
}