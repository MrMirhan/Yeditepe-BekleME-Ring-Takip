const asyncHandler = require('express-async-handler')
const mainPage = asyncHandler(async(req, res, next) => {
    return await res.render('index', { page: { title: "Bekle-Me Yeditepe Ring Takip" } });
})

module.exports = {
    mainPage
}