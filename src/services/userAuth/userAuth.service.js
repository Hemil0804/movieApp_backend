const UserModel = require("../../models/user.model");
let ObjectId = require("mongodb").ObjectId;

exports.userAuthService = async(data) => {
    try {
        let pipeline = [];
        pipeline.push({
            $match: {
                _id: data.userId
            }
        });

        const result = await UserModel.aggregate(pipeline);
        // console.log(result,'result')
        return result;
    } catch (e) {
        // console.log(e,'error')
        return false;
    }
}
