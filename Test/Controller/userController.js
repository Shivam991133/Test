const userModel = require('../Model/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    signup: async (req, res, next) => {
        try {
            const { email, firstName, lastName, mobileNumber, password, confirmPassword ,city} = req.body
            const user = await userModel.findOne({ email: email, status: "ACTIVE", userType: "USER" })
            if (user) {
                res.send({ responseCode: 409, responseMessage: "User Already exist" })
            } else {
                if (password !== confirmPassword) {
                    return res.send({ responseCode: 401, responseMessage: "password and confirmPassword does not Match" })
                } else {
                    const userSave = await userModel({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mobileNumber: mobileNumber,
                        city:city,
                        password: bcryptjs.hashSync(password)
                    }).save();
                    return res.send({ responseCode: 200, responseMessage: "signUp Succes", responseResult: userSave })
                }
            }
        } catch (error) {
            res.send({ responseCode: 501, responseMessage: "Something went Wrong", responseResult: error.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await userModel.findOne({ email: email, userType: "USER" })
                if (user) {
                    const isMatch = await bcryptjs.compareSync(password, user.password)
                    if (isMatch == true){
                        const token = jwt.sign({ userNameId: user._id }, "Hello", { expiresIn: "1d" })
                        return res.send({ responseCode: 200, responseMessage: "Login Sucess", responseResult: user, token: token })
                    }
                    else {
                       return res.send({ responseCode: 401, responseMessage: "PASSWORD_INVALID", responseResult: [] })
                    }
                }
                else {
                    return res.send({ responseCode:404, responseMessage: "User_Not_Found", responseResult: user })
                }
            } else {
                return res.send({ responseCode:400, responseMessage: "Both Field Are Required" })
            }
        }
        catch (error) {
            return res.send({ responseCode: 501, responseMessage:"Something Went Wrong",responseResult: error.message })
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body
            const user = await userModel.findOne({_id: req.userID, userType: "USER" })
            if (!user) {
                return res.send({ responseCode:404, responseMessage: "User Not Found" })
            }
            else {
                if (newPassword && confirmPassword) {
                    const isMatch = await bcryptjs.compareSync(oldPassword, user.password)
                    if (newPassword == confirmPassword) {
                        const hashnewPassword = await bcryptjs.hashSync(newPassword)
                        if (isMatch) {
                            let userSaave = await userModel.findOneAndUpdate({ _id: user._id }, { $set: { password: hashnewPassword } }, { new: true })
                            return res.send({ responseCode:200, responseMessage: "Password Change Succesfully", responseResult: userSaave })
                        } else {
                            return res.send({ responseCode: 401, responseMessage: "Password Invalid" })
                        }
                    }
                    else {
                        return res.send({ responseCode: 401, responseMessage: "Password and ConfirmPassword Not Match" })
                    }
                }
                else {
                    return res.send({ responseCode: 400, responseMessage: "Both field are Required" })
                }
            }
        }
        catch (error) {
            return res.send({ responseCode:501, responseMessage: "Something Went Wrong", responseResult: error.message });
        }
    }


}
