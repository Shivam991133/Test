const userModel = require('../Model/userModel');
module.exports = {
    list: async (req, res) => {
        try {
            let query = { userType: { $ne: "DELETE" }};
                if (req.body.city){
                    query.city = { $regex: req.body.city, $options: 'i'}
                }
            let option = {
                page:  1,
                limit: 2,
                sort: { createdAt: -1 }
            }
            let userMangement = await userModel.paginate(query,option)
            if (userMangement.docs.length == 0) {
                res.send({ responseCode: 404, responseMessage:"List Not Found", responseResult: [] })
            } else {
                res.send({ responseCode: 200, responseMessage: "List Found", responseResult: userMangement })
            }
        } catch (error){
            console.log(error.message)
        }
    },
    Block: async (req, res) => {
        try {
            let data = await userModel.findOne({ _id: req.query._id })
            if (!data) {
                res.send({ responseCode: 404, responseMessage: "User Not Found" })
            } else {
                let blockData = await userModel.findByIdAndUpdate({ _id: data._id }, { $set: { status: "BLOCK" } }, { new: true })
                return res.send({ responseCode: 200, responseMessage: "Block Succesfully", responseResult: blockData })
            } 
        } catch (error){
            res.send({ responseCode: 501, responseMessage: "Something Went Wrong", responseResult: error.message })
        }
    },
}