const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const schema = mongoose.Schema
const userSchema = new schema({
    email:{ type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    mobileNumber: { type: Number, require: true },
    city:{type:String,require:true},
    password: { type: String, require: true },
    status: { type: String, enum: ["ACTIVE", "BLOCK", "DELETE"], default: "ACTIVE" },
    userType: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    otpVerification: { type: Boolean, default: false, require: true },
  },
    { timestamps: true }
  );
  userSchema.plugin(mongoosePaginate);
  const userModel = mongoose.model("user", userSchema);
  module.exports = userModel;