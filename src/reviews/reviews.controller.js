const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const res = require("express/lib/response");

async function list() {
    const data = await service.list();
    res.json({ data: data })
};



module.exports = {
    list
}