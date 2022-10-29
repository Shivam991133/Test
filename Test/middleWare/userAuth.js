const jwt = require('jsonwebtoken');
const userModel = require('../Model/userModel');
module.exports = {
    verifyToken(req, res, next) {
        try {
            if (req.headers.token) {
                jwt.verify(req.headers.token, "Hello", (err, result) => {
                    if (err) {
                        if (err.name == "TokenExpiredError") {
                            return res.status(440).send({ responseCode: 440, responseMessage: "Session Expired, Please login again.", });
                        }
                        else {
                            return res.status(440).send({ responseCode: 440, responseMessage: "Unauthroised Person  .", });
                        }
                    }
                    else {
                        userModel.findOne({ _id: result.userNameId }, (error, result2) => {
                            if (error){
                                return next(error)
                            }
                            else if (!result2) {
                                return res.status(404).json({ responseCode: 404, responseMessage: "USER NOT FOUND" })
                            }
                            else {
                                if (result2.status == "BLOCK") {
                                    return res.status(403).json({ responseCode: 403, responseMessage: "You have been blocked by admin ." })
                                }
                                else if (result2.status == "DELETE") {
                                    return res.status(402).json({ responseCode: 402, responseMessage: "Your account has been deleted by admin ." })
                                }
                                else {
                                    req.userID = result2._id;
                                    next();
                                }
                            }
                        })
                    }
                })
            } else {
                return res.send({ responsecode: 409, responseMessage: "No Token Found" });
            }
        } catch (error) {
            return res.send({ responsecode: 501, responseMessage: "Something went Wrong", responseResult: error.message });

        }
    },
}













