const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const res = require("express/lib/response");

async function list() {
    const data = await service.list();
    res.locals.reviews = data;
    res.json({ data: data })
};

async function reviewExists(req, res, next) {
    service
    .read(req.params.reviewId)
    .then((review) => {
        if (review) {
            res.locals.review = review;
            return next();
        }
        return next({ status: 404, message: "Review cannot be found."})
    })
    .catch(next)
};

async function update(req, res, next) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    }
    const data = await service.update(updatedReview)
    
    res.json({ data: data })
}

module.exports = {
    list,
    update: [ asyncErrorBoundary(reviewExists), update ],
}