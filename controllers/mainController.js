const asyncHandler = require('express-async-handler')

const mainPage = asyncHandler(async(req, res, next) => {
    return await res.render('index', { page: { title: "Bekle-Me Yeditepe Ring Takip" } });
})

const savePage = asyncHandler(async(req, res, next) => {
    const data = req.body;

    console.log(data.properties)

    saving_data = {
        plate: data.properties.id,
        exStop: data.exStop ? data.exStop.properties.id : null,
        nowStop: data.stop ? data.stop.properties.id : null,
        nextStop: data.nextStop ? data.nextStop.properties.id : null,
        lastStopTime: data.properties.lastStopTime,
        nowTime: data.properties.nowTime,
        passedTime: (data.properties.nowTime - data.properties.lastStopTime) / 1000
    }
    console.log(saving_data)
    return res.json(saving_data)


})

module.exports = {
    mainPage,
    savePage
}