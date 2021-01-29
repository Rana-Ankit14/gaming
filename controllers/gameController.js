const GameResult = require('../models/GameResultModel')


exports.saveResult = async (req, res) => {
    console.log('*************** called game Save from ******************8888')
    try {
        const newResultDetail = {
            points: req.body.points,
            userID: req.user.userID,
        }

        const prevResult = await GameResult.findOne({}).select('resultID').sort({createdDate: -1, resultID: -1});
        // console.log({prevResult})
        newResultDetail['resultID'] = (prevResult === null) ? 1 : prevResult.resultID + 1;

        const newResult = await GameResult.create(newResultDetail)
        // console.log('*************** New Result Created ********************')
        // console.log({newResult})

    } catch (err) {
        console.log(err)
    }
    res.json({'Saved': true});

};

exports.gameResultDetail = async (req, res) => {
    console.log('*************** Game Result ******************')
    try {
        const individual = req.body.individual !== undefined ? req.body.individual : false;
        const condition = {};
        if (individual) {
            condition['userID'] = req.user.userID;
        }

        const gameResult = await GameResult.find(condition).select('points userID').sort({points: -1}).populate({
            path: 'user_details',
        })


        const response = [];

        if (gameResult.length > 0) {
            let samePosition = 0;
            gameResult.forEach((result, index) => {
                const temp_object = {
                    index: index,
                    name: result.user_details[0].name,
                    points: parseInt(result.points),
                };
                const prevPoint = response[response.length - 1] !== undefined ? response[response.length - 1].points : -1;
                if (prevPoint === result.points) {
                    // console.log('same')
                    temp_object['position'] = response[response.length - 1].position;
                    samePosition++;
                } else {
                    if (index === 0) {
                        // console.log('first')
                        temp_object['position'] = 1;

                    } else {
                        // console.log('increment')
                        temp_object['position'] = response[response.length - 1].position + samePosition+1;
                    }
                    samePosition = 0;
                }
                // console.log(temp_object)
                response.push(temp_object)
            })
        }

        res.send(response)

    } catch (err) {
        console.log(err)
    }
}

exports.countDailyGame = async (req, res) => {
    console.log('*************** Count Daily Game ******************')
    try {

        const todays_date = new Date();
        todays_date.setHours(0,0,0,0);
        console.log(todays_date.toLocaleString())
        const condition = {createdDate : {$gte: todays_date} , userID: req.user.userID}
        const count = await GameResult.count(condition);
        console.log({count})
        res.json({'daily_count' : count})

    } catch (err) {
        console.log(err)
    }
}
